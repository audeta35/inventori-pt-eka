const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { query: { productId } } = req
    const {
      suplierId,
      ingredientId,
      productName,
      productStock,
      productEd,
      productOriginalPacking,
      productPrice
    } = req.body

    if (!suplierId) {
      return response.falseRequirement(res, 'suplierId')
    } else if (!ingredientId) {
      return response.falseRequirement(res, 'ingredientId')
    } else if (!productName) {
      return response.falseRequirement(res, 'productName')
    } else if (!productStock) {
      return response.falseRequirement(res, 'productStock')
    } else if (!productEd) {
      return response.falseRequirement(res, 'productEd')
    } else if (!productOriginalPacking) {
      return response.falseRequirement(res, 'productOriginalPacking')
    } else if (!productPrice) {
      return response.falseRequirement(res, 'productPrice')
    } else {
      let query = `SELECT product_stock, product_price FROM products WHERE id_product = ?`
      conn.query(query, [productId], (err, product) => {
        if (err) {
          return response.error(res, err)
        }
        if (product.length < 1) {
          return response.notFound(res)
        }
        product = product[0]

        query = `SELECT id_input, item_amount FROM inputs WHERE id_product = ? ORDER BY created_time DESC LIMIT 1`
        conn.query(query, [productId], (err, input) => {
          if (err) {
            return response.error(res, err)
          }
          input = input[0]
          let stockNow = 0
          if (parseInt(productStock) > product.product_stock) {
            stockNow = parseInt(productStock) - product.product_stock
          } else {
            stockNow = (product.product_stock - parseInt(productStock) - input.item_amount)
          }
          if (product.product_stock === parseInt(productStock)) {
            stockNow = input.item_amount
          }
          const totalPriceNow = parseInt(stockNow) * product.product_price

          query = `UPDATE products, inputs 
                   SET products.id_suplier = ?, products.id_ingredient = ?, products.product_name = ?, products.product_stock = ?, products.product_ed = ?, products.product_original_packing = ?, products.product_price = ?, 
                       inputs.item_amount = ?, inputs.total_price = ?
                   WHERE products.id_product = inputs.id_product AND inputs.id_input = ?`
          const payload = [suplierId, ingredientId, productName, productStock, productEd, productOriginalPacking, productPrice, stockNow, totalPriceNow, input.id_input]

          conn.query(query, payload, (err, result) => {
            if (err) {
              return response.error(res, err)
            }
            if (result.affectedRows !== 2) {
              return response.invalid(res, 'Id input')
            }
            query = 'SELECT *FROM products WHERE deleted_time IS NULL'
            conn.query(query, (err, userList) => {
              if (err) {
                return response.error(res, err)
              }
              if (userList.length < 1) {
                return response.notFound(res)
              }
              return response.success(res, userList)
            })
          })
        })
      })
    }
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
