const app = require('./app')

app.listen(3000, () => {
  console.log('server up!')
})

module.exports = app