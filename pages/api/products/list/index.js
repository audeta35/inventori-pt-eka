const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'GET') {
    const query = 'SELECT * FROM products WHERE deleted_time IS NULL'
    conn.query(query, (err, productList) => {
      if (err) {
        return response.error(res, err)
      }
      if (productList.length < 1) {
        return response.notFound(res)
      }
      return response.success(res, productList)
    })
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
