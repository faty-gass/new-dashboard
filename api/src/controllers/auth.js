import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

//register a new user in the db
export const signup = async (req, reply) =>{
  try {
    if (req.body.name && req.body.email && req.body.password){
      const user = await User.findOne({email : req.body.email})
      if (user){
        return reply.code(422)
          .send ({
            message : "Mail already in use"
          })
      } else{
        // TO DO : check mail format
        // TO DO : strong password control 
        const hashPwd = await bcrypt.hash(req.body.password, 10)
        const newUser = new User ({
          name : req.body.name,
          email : req.body.email,
          phone : req.body.phone? req.body.phone : '',
          birthdate : req.body.birthdate? req.body.birthdate : '',
          password : hashPwd
        })
        newUser.save()
        return reply.code(201)
          .send({
            message : `User ${newUser._id} created`
          })
      }
    } else {
      return reply.code(400)
      .send ({
        message : "Missing request parameter"
      })
    }

  } catch (e){
    console.error(e)
    return reply.code(500)
    .send({
      message : "Error occured while creating new user"
    })
  }
}

// log a user in & send a token
export const signin = async (req, reply) =>{
  try {
    const user = await User.findOne({email : req.body.email})
    if (user){
      // check password
      const pwdValid = await bcrypt.compare(req.body.password, user.password)
      if (pwdValid){
        const token = jwt.sign({id : user._id, name : user.name, role : user.role}, process.env.JWT_SECRET)
        return reply.code(200)
        .send({
          token 
        })
      } else {
        return reply.code(401)
        .send({
          message : "Access denied"
        })
      }
    } else {
      return reply.code(404)
      .send({
        message : "No user found"
      })
    }

  } catch (e) {
    console.error(e)
    return reply.code(500)
    .send({
      message : "Error occured in login process"
    })
  }
}

export const getUser = async (req, reply) => {
  if(req.tokenData){
    return reply.code(200)
    .send({
      user : req.tokenData
    })
  } else {
    return reply.code(401)
    .send({
      message : "Invalid token"
    })
  }

}