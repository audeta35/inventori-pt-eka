const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'POST') {
    const {
      suplierId,
      ingredientId,
      productName,
      productCode,
      productStock,
      productEd,
      productOriginalPacking,
      totalPrice,
      userId
    } = req.body

    if (!suplierId) {
      return response.falseRequirement(res, 'suplierId')
    } else if (!ingredientId) {
      return response.falseRequirement(res, 'ingredientId')
    } else if (!productName) {
      return response.falseRequirement(res, 'productName')
    } else if (!productCode) {
      return response.falseRequirement(res, 'productCode')
    } else if (!productStock) {
      return response.falseRequirement(res, 'productStock')
    } else if (!productEd) {
      return response.falseRequirement(res, 'productEd')
    } else if (!productOriginalPacking) {
      return response.falseRequirement(res, 'productOriginalPacking')
    } else if (!userId) {
      return response.falseRequirement(res, 'userId')
    } else if (!totalPrice) {
      return response.falseRequirement(res, 'totalPrice')
    } else {
      // insert products
      let query = `INSERT INTO products 
                         SET id_ingredient = ?, product_name = ?, product_code = ?, product_stock = ?, product_ed = ?, product_original_packing = ?
                        `
      conn.query(query, [ingredientId, productName, productCode, productStock, productEd, productOriginalPacking],
        (err, result) => {
          if (err) {
            return response.error(res, err)
          }
          const productId = result.insertId
          // insert to table inputs
          query = `INSERT INTO inputs
                             SET id_product = ?, id_suplier = ?, id_user = ?, item_amount = ?, total_price = ?
                            `
          conn.query(query, [productId, suplierId, userId, productStock, totalPrice],
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
    }
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
