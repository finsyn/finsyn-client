const axios = require('axios')
const qs = require('qs')
const { assoc, tap, juxt, always, join, applySpec, tryCatch,
  pipe, then, prop, bind} = require('ramda')

const stringifyParams = bind(qs.stringify, qs) 
const toBasicAuthHeader = ({ username, password }) => {
  const base64Credentials = Buffer.from(username + ':' + password).toString('base64')
  return `Basic ${base64Credentials}`
}

const premiumHeaders = applySpec({
  Authorization: toBasicAuthHeader
})

const makeReq = params => axios(params) 
  .then(prop('data'))
  .catch(
    e => console.error(e.response)
  )

const apiGetReq = applySpec({
  url: pipe(
    juxt([
      prop('apiOrigin'),
      always('/'),
      prop('resource'),
      always('?'),
      pipe(prop('params'), stringifyParams)
    ]),
    join('')
  ),
  method: always('get'),
  headers: premiumHeaders
})

const makeApiGetReq = resource => pipe(
  assoc('resource', resource),
  apiGetReq,
  makeReq
)

const getActivities = makeApiGetReq('v1/activity') 
const getSecurityProfile = makeApiGetReq('v0/security') 
const getQuotes = makeApiGetReq('v0/quote') 
const getShortPositions = makeApiGetReq('v1/shortposition') 

module.exports = {
  apiGetReq,
  finsynApi: makeApiGetReq,
  getActivities,
  getSecurityProfile,
  getShortPositions,
  getQuotes
}
