const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'DELETE') {
    const { query: { userId } } = req

    let query = 'DELETE FROM users WHERE id_user = ?'
    conn.query(query, [userId], (err, result, field) => {
      if (err) {
        return response.error(res, err)
      }
      query = 'SELECT *FROM users'
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
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
