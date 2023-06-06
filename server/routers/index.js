const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler')
const userRouter = require('../routers/user')
// const authentication = require('../middlewares/authentication')

router.use('/user', userRouter)
router.use(errorHandler)
module.exports = router