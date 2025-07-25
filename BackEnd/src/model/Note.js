import mongoose from "mongoose";

//first i will create a schemma of notes , just like title description , create at , updated at
//then i will create a model based on that schemma


const noteSchema =  new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    content : {
        type : String,
        required : true
    }
} , {timestamps: true})// if set timestamp to true mongoDb will  give us createat and updatedat time 


//now create a model based on that noteSchema
const Note = mongoose.model("Note" , noteSchema)


//now export this model so that we can use this in other files 
export default Note;

