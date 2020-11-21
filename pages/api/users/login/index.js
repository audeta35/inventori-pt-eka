const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')
const sha256 = require('sha256')
const jwt = require('jsonwebtoken')

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body
    const hashPassword = sha256(password)
    const query = `SELECT * FROM users WHERE name=? AND password=?`

    conn.query(query, [username, hashPassword], (err, userList) => {
      if (err) {
        return response.err(res, err)
      } else if (userList.length === 0) {
        return response.notFound(res, err)
      } else {
        const token = jwt.sign({ userList }, process.env.JWT_KEY, {
          expiresIn: '12h'
        })
        return response.loginSuccess(res, userList, token)
      }
    })
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
