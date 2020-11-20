const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'GET') {
    const query = 'SELECT * FROM company'
    conn.query(query, (err, companyList) => {
      if (err) {
        return response.error(res, err)
      }
      if (companyList.length < 1) {
        return response.notFound(res)
      }
      return response.success(res, companyList)
    })
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
