const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'GET') {
    const query = 'SELECT * FROM `users`'
    conn.query(query, (err, userList) => {
      if (err) {
        return response.error(res, err)
      }
      if (userList.length < 1) {
        return response.notFound(res)
      }
      return response.success(res, userList)
    })
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
