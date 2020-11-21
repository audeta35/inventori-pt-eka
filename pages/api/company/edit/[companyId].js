const conn = require('../../../../server/config/mysqli')
const response = require('../../../../server/config/response')

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { query: { companyId } } = req
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
      let query = 'UPDATE company SET company_name = ?, company_address = ?, company_email = ?, company_phone = ?, company_picture = ?, company_website = ? WHERE id_company = ?'
      const payload = [name, address, email, phone, picture, website, companyId]

      conn.query(query, payload, (err, result) => {
        if (err) {
          return response.error(res, err)
        }
        console.log('affected: ', result)
        if (result.affectedRows !== 1) {
          return response.invalid(res, 'company id')
        }
        query = 'SELECT *FROM company'
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
