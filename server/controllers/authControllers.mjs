import User from "../models/user_model.mjs";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/error.mjs";


export const signup = async (req, res, next) => {
    const {username, email, password, role} = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email, password:hashedPassword, role})
    try{
        await newUser.save()
        res.status(201).json("User created successfully")

    }catch(err){
        next(err)
    }

}

export const signin = async (req, res, next) => {
    const {email, password} = req.body

    try{
        const validateUser = await User.findOne({email})

        if(!validateUser){
            return next(ErrorHandler(404, 'User not found'))
        }

        const validatePassword = bcryptjs.compareSync(password, validateUser.password)

        if(!validatePassword){
            return next(ErrorHandler(401, 'Invalid credentials'))

        }
        // console.log(process.env.JWT_SECRET)
        const token = jwt.sign({id:validateUser._id}, process.env.JWT_SECRET)
        const {password:pass, ...user} = validateUser._doc
        res.status(200).json({user, token})



    }catch(err){
        next(err)

    }


}