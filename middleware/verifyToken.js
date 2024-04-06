const jwt = require( "jsonwebtoken" )
const  User  = require('../models/userModel') 
const JWT_SECRET_KEY = process.env.JWT_SECRET


const verifyToken = async ( req, res, next ) => {

  const authorization = req.headers.authorization || req.headers.Authorization

  
  if (!authorization) {
    return res.status(401).json({ 
      message:  'You are not authorized.'
    })
  }
  try {
    const token = authorization.split('Bearer ')[1]
    if (!token) {
      return res.status(401).json({ 
        message:  'invalid token format.'
      })
    }
    
    const decoded = jwt.verify(token, JWT_SECRET_KEY)
    const { userId, email } = decoded

    req.user = decoded
    const currentTime = Date.now() / 1000; // JWT exp is in seconds

if (decoded.exp - currentTime < 600) { // Less than 10 minutes to expire

  const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' })

  res.cookie(token, newToken, { httpOnly: true }); // Renew the token in the cookie

    // Checking if its the user 
    const user = await User.findById(userId)
    if (!user) {
      return res.status(401).json({ message: 'User does not exist'})
    }

      req.auth ={ userId, email}

      next()

    }
  } catch (error) {
    next(error)
  }
}

module.exports = verifyToken