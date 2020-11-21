const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'GET') {
    const query = 'SELECT * FROM suplier'
    conn.query(query, (err, suplierList) => {
      if (err) {
        return response.error(res, err)
      }
      if (suplierList.length < 1) {
        return response.notFound(res)
      }
      return response.success(res, suplierList)
    })
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
