const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'GET') {
    const query = 'SELECT * FROM ingredients'
    conn.query(query, (err, ingredientList) => {
      if (err) {
        return response.error(res, err)
      }
      if (ingredientList.length < 1) {
        return response.notFound(res)
      }
      return response.success(res, ingredientList)
    })
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
