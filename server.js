var express = require('express')
var app = express()
app.use(express.static('./dist'))
app.listen(8023, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + 8023 + '\n')
})
