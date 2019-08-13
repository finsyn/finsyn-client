const t = require('tap')
const { apiGetReq } = require('./index')

t.test(t => {
  const opt = {
    username: 'test',
    password: 'secret',
    apiOrigin: 'https://test.finsyn.se',
    params: {
      filter: {
        isin: 'SE12'
      }
    },
    resource: 'v0/test'
  }
  const req = apiGetReq(opt)
  t.similar(
    req, {
      method: 'get',
      headers: {
        Authorization: 'Basic dGVzdDpzZWNyZXQ='
      },
      url: 'https://test.finsyn.se/v0/test?filter%5Bisin%5D=SE12'
    }
  )
  t.done()
})

