const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true
    },
  email: {
    type: String, 
    unique: true,
    required: [true, 'Email is required']
  },

  password: {
    type: String, 
    required: [true, 'Password is required'], 
    trim: true,
    select: false,
    min: [8, 'Password should be  at least 8 characters']
  },

  password_reset_token: String,

  password_reset_token_expiry: Date,
},
{
  timestamps: true
}
)

const User = mongoose.model("User", userSchema)

module.exports = User