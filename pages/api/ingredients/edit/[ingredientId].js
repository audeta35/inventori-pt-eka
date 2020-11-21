const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { query: { ingredientId } } = req
    const { code, name } = req.body
    if (!code) {
      return response.falseRequirement(res, 'code')
    } else if (!name) {
      return response.falseRequirement(res, 'name')
    } else {
      let query = 'UPDATE ingredients SET ingredient_code = ?, ingredient_name = ? WHERE id_ingredient = ?'
      const payload = [code, name, ingredientId]

      conn.query(query, payload, (err, result) => {
        if (err) {
          return response.error(res, err)
        }
        if (result.affectedRows !== 1) {
          return response.invalid(res, 'ingredient id')
        }
        query = 'SELECT *FROM ingredients'
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
    }
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
