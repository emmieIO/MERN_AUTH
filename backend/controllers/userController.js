import asyncHandler from 'express-async-handler'
import User from '../Models/userModel.js'
import generateToken from '../utils/token.js'

// @desc    Auth user/set token
// @route   POST/api/users/auth
// @access  public
 
export const authUser = asyncHandler(async (req,res)=>{
  const {email, password} = req.body;
  const user = await User.findOne({
    email:email
  })

  if(user && await user.matchPasswords(password)){
    generateToken(res,user._id)
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email
    })
  }else{
    res.status(401);
    throw new Error('Invalid login credentials')
  }
})



// @desc    Register a new user
// @route   POST /api/users/register
// @access  public
export const registerUser = asyncHandler(async (req,res)=>{
   const {name, email, password} = await req.body
   const userExists = await User.findOne({
    email:email
   })

   if(userExists){
        res.status(400)
        throw new Error('User already Exists.')
   }

  const  user = await User.create({
    name,
    email,
    password
  })

  if(user){
    generateToken(res,user._id)
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email
    })
  }else{
    res.status(400)
    throw new Error('Invalid user data');
  }
})

// @desc    Logout user
// @route   POST /api/users/register
// @access  public
export const logOutUser = asyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'Logout User'})
  
})

// @desc    Update user profile
// @route   GET /api/users/profile
// @access  public
export const getUserProfile = asyncHandler(async (req,res)=>{
    res.status(200).json({
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email
    })
  
})
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  public
export const updateUserProfile = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id)
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password){
        user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.status(201).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
    })
   
})