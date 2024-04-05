const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET


const createJwtToken = (userId, email) => {
  const token = jwt.sign({ userId, email }, 
    JWT_SECRET_KEY, { expiresIn: '1d', algorithm: "HS256", issuer: `User ${email}` }
    )
}

module.exports = createJwtToken