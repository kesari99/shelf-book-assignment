import mongoose from 'mongoose'

const booksSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    
 


}, {timestamps:true})

const Books = mongoose.model('booksSchema', booksSchema)

export default Books