# Finsyn NodeJS Client

Just a little helper client to authenticate and make requests to endpoints of the [Finsyn API](https://docs.finsyn.se/api/overview).

## Usage
```
npm install --save finsyn-client
```

```JavaScript
const { finsynApi } = require('finsyn-client')

const getActivities = finsynApi('v1/activity')

getActivities({
  params: {
    filter: {
      isin: 'SE1212121212'
    }
  },
  apiOrigin: 'https://api.finsyn.se',
  username: 'exampleUser',
  password: 'examplePassword'
})
.then(console.log)
```
