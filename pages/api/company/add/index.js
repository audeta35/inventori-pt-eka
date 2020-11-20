const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, address, email, phone, picture, website } = req.body
    if (!name) {
      return response.falseRequirement(res, 'name')
    } else if (!address) {
      return response.falseRequirement(res, 'address')
    } else if (!email) {
      return response.falseRequirement(res, 'email')
    } else if (!phone) {
      return response.falseRequirement(res, 'phone')
    } else if (!picture) {
      return response.falseRequirement(res, 'picture')
    } else if (!website) {
      return response.falseRequirement(res, 'website')
    } else {
      let query = 'INSERT INTO company SET company_name = ?, company_address = ?, company_email = ?, company_phone = ?, company_picture = ?, company_website = ?'
      conn.query(query, [name, address, email, phone, picture, website], (err, result) => {
        if (err) {
          return response.error(res, err)
        }
        query = 'SELECT *FROM company'
        conn.query(query, (err, companyList) => {
          if (err) {
            return response.error(res, err)
          }
          if (companyList.length < 1) {
            return response.notFound(res)
          }
          return response.success(res, companyList)
        })
      })
    }
  } else {
    return response.errorMethodNotAllowed(res)
  }
}
