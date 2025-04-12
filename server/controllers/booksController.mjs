import Books from "../models/books.mjs"
import { ErrorHandler } from "../utils/error.mjs"



export const addBook = async (req, res,next) => {
    const {name, email, title ,author, location} = req.body 

    const newEmployee = new Books({name, email, title ,author, location})
    try{
        await newEmployee.save()
        res.status(201).json("Books added successfully")
    }catch(err){
        next(err)
    }


}   

export const getBooks = async (req, res, next) => {
    try{
        const employees = await Books.find()
        res.status(200).json(employees)
    }catch(err){
        next(err)
    }
}

export const updateBook = async (req, res, next) => {
    
    const {name, email, title ,author, location } = req.body 

    try{
        const updatedBook = await Books.findOneAndUpdate(
            {email},
            {name, title, author,author,location},
            { new: true, runValidators: true }
        )

        if(!updatedBook){
            return next(ErrorHandler(404, 'User not found'))
        }
        res.status(200).json(updatedBook)

    }catch(err){
        next(err)
    }

    
}

export const deleteBook= async (req, res, next) => {
    const { email } = req.params;

    try {
        const deletedBook = await Books.findOneAndDelete({ email });

        if (!deletedBook) {
            return next(ErrorHandler(404, 'Book not found'));
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        next(err);
    }
};
