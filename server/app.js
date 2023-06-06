require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const router = require('./routers')
const errorHandler = require('./middlewares/errorHandler')



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
