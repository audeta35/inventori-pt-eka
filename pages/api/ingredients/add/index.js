const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'POST') {
    const { code, name } = req.body
    if (!code) {
      return response.falseRequirement(res, 'code')
    } else if (!name) {
      return response.falseRequirement(res, 'name')
    } else {
      let query = 'INSERT INTO ingredients SET ingredient_code = ?, ingredient_name = ?'
      conn.query(query, [code, name], (err, result) => {
        if (err) {
          return response.error(res, err)
        }
        query = 'SELECT *FROM ingredients'
        conn.query(query, (err, ingredientList) => {
          if (err) {
            return response.error(res, err)
          }
          if (ingredientList.length < 1) {
            return response.notFound(res)
          }
          return response.success(res, ingredientList)
        })
      })
    }
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
