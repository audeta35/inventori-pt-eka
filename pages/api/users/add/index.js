const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')
const sha256 = require('sha256')

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, password, address, level, status } = req.body
    if (!name) {
      return response.falseRequirement(res, 'Name')
    } else if (!password) {
      return response.falseRequirement(res, 'Password')
    } else if (!address) {
      return response.falseRequirement(res, 'Address')
    } else if (!level) {
      return response.falseRequirement(res, 'Level')
    } else if (!status) {
      return response.falseRequirement(res, 'Status')
    } else {
      const hashPassword = sha256(password)

      let query = 'INSERT INTO users SET name = ?, password = ?, address = ?, level = ?, status = ?'
      conn.query(query, [name, hashPassword, address, level, status], (err, result, field) => {
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
    }
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
