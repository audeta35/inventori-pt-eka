const conn = require('../../../../../server/config/mysqli')
const response = require('../../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'POST') {
    const { query: { productId } } = req
    const { userId, stock } = req.body

    if (!productId) {
      return response.falseRequirement(res, 'productId')
    } else if (!userId) {
      return response.falseRequirement(res, 'userId')
    } else if (!stock) {
      return response.falseRequirement(res, 'stock')
    } else {
      // get detail product
      let query = `SELECT *FROM products
                     WHERE id_product = ? AND deleted_time IS NULL
                    `
      conn.query(query, [productId], (err, product) => {
        if (err) {
          return response.error(res, err)
        }
        if (product.length < 1) {
          return response.notFound(res, err)
        }
        product = product[0]

        const productStock = product.product_stock + parseInt(stock)
        // update product stock
        query = `UPDATE products SET product_stock = ? WHERE id_product = ?`
        conn.query(query, [productStock, productId],
          (err, resUpdate) => {
            if (err) {
              return response.error(res, err)
            }
            if (resUpdate.affectedRows !== 1) {
              return response.invalid(res, 'Product Id')
            }
            // insert to table inputs
            const totalPrice = product.product_price * parseInt(stock)

            query = `INSERT INTO inputs
                             SET id_product = ?, id_suplier = ?, id_user = ?, item_amount = ?, total_price = ?
                    `
            conn.query(query, [productId, product.id_suplier, userId, stock, totalPrice],
              (err) => {
                if (err) {
                  return response.error(res, err)
                }
                // select all products
                query = `SELECT * FROM products WHERE deleted_time IS NULL`
                conn.query(query, (err, productList) => {
                  if (err) {
                    return response.error(res, err)
                  }
                  if (productList.length < 1) {
                    return response.notFound(res)
                  }
                  return response.success(res, productList)
                })
              })
          })
      })
    }
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
