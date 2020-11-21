const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, address, phone } = req.body
    if (!name) {
      return response.falseRequirement(res, 'name')
    } else if (!address) {
      return response.falseRequirement(res, 'address')
    } else if (!phone) {
      return response.falseRequirement(res, 'phone')
    } else {
      let query = 'INSERT INTO suplier SET suplier_name = ?, suplier_address = ?, suplier_phone = ?'
      conn.query(query, [name, address, phone], (err, result) => {
        if (err) {
          return response.error(res, err)
        }
        query = 'SELECT *FROM suplier'
        conn.query(query, (err, suplierList) => {
          if (err) {
            return response.error(res, err)
          }
          if (suplierList.length < 1) {
            return response.notFound(res)
          }
          return response.success(res, suplierList)
        })
      })
    }
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
