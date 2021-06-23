import User from '../models/user.js'
import bcrypt from 'bcrypt'

export const listUsers = async ( req , reply) => {
  try {
    const allUsers = await User.find()
    return reply.code(200)
      .send ( allUsers.map( x => ({
        id : x.id,
        name : x.name,
        email : x.email,
        phone : x.phone || '',
        birthdate : x.birthdate || '',
        role : x.role
        })  
      ))
  } catch (e){
    console.error(e)
    return reply.code(500)
    .send({
      message : "Error occured while fetching users"
    })
  }
 
}

export const updateUser = async ( req , reply) => {
  try {
    const userId = req.params.userId
    if (userId === req.tokenData.id) {
      const user = await User.findById(userId)
      if (user){
        // TO DO : check if email is valid format & already in use 
        req.body.name? user.name = req.body.name : '' ;
        req.body.email? user.email = req.body.email : '' ;
        req.body.phone? user.phone = req.body.phone : '' ;
        req.body.birthdate? user.birthdate = req.body.birthdate : '' ;
        await user.save()
        return reply.code(200)
        .send ({ message : "User successfully updated"})
      } else {
        return reply.code(404)
        .send ({ message : "No user found"})
      }
    } else {
      return reply.code(401)
      .send ({ message : "You are not authorised to updated this user"})
    }
  } catch (e){
    console.error(e)
    return reply.code(500)
    .send({
      message : "Error occured while updating user"
    })
  }
}

export const updatePwd = async ( req , reply) => {
  try {
    const userId = req.params.userId
    if (userId === req.tokenData.id) {
      const user = await User.findById(userId)
      if (user){
        if (req.body.password){
          // TO DO : strong password control 
          const hash = await bcrypt.hash(req.body.password, 10)
          user.password = hash
        }
        await user.save()
        return reply.code(200)
        .send ({ message : "User password successfully updated" })
      } else {
        return reply.code(404)
        .send ({ message : "No user found"})
      }
    } else {
      return reply.code(401)
      .send ({ message : "You are not authorised to updated this user"})
    }

  } catch (e){
    console.error(e)
    return reply.code(500)
    .send({
      message : "Error occured while updating user"
    })
  }
}

export const updateRole = async ( req , reply) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)
    if (user){
      //TO DO : check if body.role is either admin or user 
      user.role = req.body.role
      await user.save()
      return reply.code(200)
      .send ({ message : "User role successfully updated" })
    } else {
      return reply.code(404)
      .send ({ message : "No user found"})
    }
  } catch (e){
    console.error(e)
    return reply.code(500)
    .send({
      message : "Error occured while updating user"
    })
  }
}

export const deleteUser = async ( req , reply) => {
  try {

  } catch (e){
    console.error(e)
    return reply.code(500)
    .send({
      message : "Error occured while deleting user"
    })
  }
}