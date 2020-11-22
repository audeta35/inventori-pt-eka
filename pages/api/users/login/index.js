const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')
const sha256 = require('sha256')

export default async (req, res) => {
  if (req.method === 'POST') {
    console.log('hello')
    const { username, password } = JSON.parse(req.body);
    const hashPassword = sha256(password)
    const query = `SELECT * FROM users WHERE name=? AND password=?`

    conn.query(query, [username, hashPassword], (err, userList) => {
      if (err) {
        return response.err(res, err)
      } else if (userList.length === 0) {
        return response.notFound(res, err)
      } else {
        return response.loginSuccess(res, userList)
      }
    })
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
