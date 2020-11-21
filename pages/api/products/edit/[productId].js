const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { query: { productId } } = req
    const {
      ingredientId,
      productName,
      productCode,
      productStock,
      productEd,
      productOriginalPacking
    } = req.body

    if (!ingredientId) {
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
    } else {
      let query = `SELECT product_stock FROM products WHERE id_product = ?`
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

          query = `UPDATE products, inputs 
                   SET products.id_ingredient = ?, products.product_name = ?, products.product_code = ?, products.product_stock = ?, products.product_ed = ?, products.product_original_packing = ?, 
                       inputs.item_amount = ?
                   WHERE products.id_product = inputs.id_product AND inputs.id_input = ?`
          const payload = [ingredientId, productName, productCode, productStock, productEd, productOriginalPacking, stockNow, input.id_input]

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
