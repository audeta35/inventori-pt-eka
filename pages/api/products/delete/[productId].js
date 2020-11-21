const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'DELETE') {
    const { query: { productId } } = req

    let query = 'UPDATE products SET deleted_time = now() WHERE id_product = ?'
    conn.query(query, [productId], (err, result) => {
      if (err) {
        return response.error(res, err)
      }
      if (result.affectedRows !== 1) {
        return response.invalid(res, 'id product')
      }
      query = 'SELECT *FROM products WHERE deleted_time IS NULL'
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
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
