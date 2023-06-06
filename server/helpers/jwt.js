var jwt = require("jsonwebtoken")
// const SECRET_KEY = "hacktiv8"
const SECRET_KEY = process.env.SECRET_KEY


const signToken = (data) => {
    console.log(data, SECRET_KEY);
    return jwt.sign(data, SECRET_KEY)
}

const verifyToken = (token) => {
    console.log(token, SECRET_KEY);
    return jwt.verify(token, SECRET_KEY)
}

module.exports = { signToken, verifyToken }