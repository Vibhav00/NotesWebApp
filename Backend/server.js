const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app.js')
dotenv.config({ path: './config.env' })
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log('connected')
  })
  .catch((err) => console.log(err))
app.listen(3000, () => {
  console.log('listening on port 3000')
})
