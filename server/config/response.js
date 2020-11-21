'use strict'

/* Success Response */
exports.success = (res, value) => {
  const result = {
    status: {
      code: 200,
      message: 'success'
    },
    value
  }
  res.status(200).json(result)
  res.end()
}

exports.changed = (res, data, message) => {
  const result = {
    code: 201,
    message: `data successfully ${message}`,
    data: data
  }
  res.status(201).json(result)
  res.end()
}

/* Error Response */

exports.notFound = res => {
  const result = {
    code: 404,
    message: 'No entry found'
  }
  res.status(404).json(result)
  res.end()
}

exports.falseRequirement = (res, field) => {
  const result = {
    status: {
      code: 500,
      message: 'Form ' + field + ' tidak boleh kosong.'
    }
  }
  res.status(500).json({ results: result })
  res.end()
}

exports.loginFailed = res => {
  res.status(403).send({
    status: 403,
    message: 'Incorrect username or password'
  })
}

exports.loginSuccess = (res, rows, token) => {
  res.status(200).send({
    status: 200,
    data: rows,
    token: token
  })
}

exports.invalid = (res, status) => {
  res.status(400).json({
    status: 400,
    message: 'Invalid ' + status
  })
}

exports.error = (res, err) => {
  res.status(422).json({
    status: 422,
    message: err
  })
}

exports.errorMethodNotAllowed = (res) => {
  res.status(405).json({
    status: 405,
    message: 'Method Not Allowed'
  })
}
