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
        const hashPwd = await bcrypt.hash(req.body.password, 10)
        const newUser = new User ({
          name : req.body.name,
          email : req.body.email,
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

/*   try {
    const token = jwt.sign({email : req.body.email}, process.env.JWT_SECRET)
    if (token) {
      return reply.code(200)
      .send({ name : req.body , email : req.body.email, token })
    } else {
      return reply.code(400)
        .send({message : "invalid request body"})
    }
 
  } catch (err){
    console.log(err)
  } */

}

// log a user in & send a token
export const signin = (body) =>{
  const token = jwt.sign({email : body.email}, process.env.JWT_SECRET)
  return { name : body.name , email : body.email, token }
}