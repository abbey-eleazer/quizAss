const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createJwtToken = require('../utils/generateToken')

/**
 * @access   Public 
 * @url      /signup
 * @method   POST
 */

exports.signup = async (req, res, next) => {
   const { username, email, password } = req.body

   if ( !username || !email || !password ) {
    res.json({ error: 'All fields are required' })
    return false
   }

   //checking password
   if (password && password.length <= 7) {
    throw new Error('Password must be at least 8 characters long!')
   }

   //check if user already exists
   const  userExist = await User.findOne({email})
   if(userExist) {
    return res.status(401).json({ message: 'User already exists'})
   }

   try {

    //hash password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)

     //create a user
     const user = await User.create({ 
      username, 
      email,
      password: hashedPassword,
     })

     res.status(201).json({ message: 'Account created successfuly, Please login to continue' })


   } catch (error) {
     next(error)
   }
}


exports.login = async (req, res, next) => {
   
  const { email, password } = req.body
 
  //check user credentials
  if ( !email || !password){
    res.status(400).json({ error: 'All fields are required' })
    return false
  }

  //verify user
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return res.status(400).json({ message:  "Email or Password is incorrect" })
  }

  try {
    
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid user credentials' })
    }

    user.password = undefined

    //generate token
    const token = createJwtToken(user?._id, user?.email)

    res.cookie('userToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1 * 24 * 60 * 60 * 1000
    })

     res.status(200).json({ message: 'Login successful', data: token })
  } catch (error) {
    next(error)
  }

}

exports.getUser = async (req, res, next) => {
   
}