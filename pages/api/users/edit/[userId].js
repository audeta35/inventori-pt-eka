const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')
const sha256 = require('sha256')

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { query: { userId } } = req

    const { name, password, address, level, status } = req.body
    if (!name) {
      return response.falseRequirement(res, 'Name')
    } else if (!address) {
      return response.falseRequirement(res, 'Address')
    } else if (!level) {
      return response.falseRequirement(res, 'Level')
    } else if (!status) {
      return response.falseRequirement(res, 'Status')
    } else {
      let query = 'UPDATE users SET name = ?, address = ?, level = ?, status = ? WHERE id_user = ?'
      const payload = [name, address, level, status, userId]

      if (password) {
        query += ', password = ?'
        const hashPassword = sha256(password)
        payload.push(hashPassword)
      }
      conn.query(query, payload, (err, result, field) => {
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
