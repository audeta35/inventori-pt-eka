const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { query: { suplierId } } = req
    const { name, address, phone } = req.body
    if (!name) {
      return response.falseRequirement(res, 'name')
    } else if (!address) {
      return response.falseRequirement(res, 'address')
    } else if (!phone) {
      return response.falseRequirement(res, 'phone')
    } else {
      let query = 'UPDATE suplier SET suplier_name = ?, suplier_address = ?, suplier_phone = ? WHERE id_suplier = ?'
      const payload = [name, address, phone, suplierId]

      conn.query(query, payload, (err, result) => {
        if (err) {
          return response.error(res, err)
        }
        if (result.affectedRows !== 1) {
          return response.invalid(res, 'suplier id')
        }
        query = 'SELECT *FROM suplier'
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
