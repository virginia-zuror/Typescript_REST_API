import mongoose, { Schema } from "mongoose";





const Lesson = new Schema (

  {
    id: {
        type: Number,
        trim:true,
    },

    title:{
        type: String,
        trim:true,
    },

    duration: {
        type: String,
        trim:true,
    },
    seqNo:{
        type: Number,
        trim:true,
    },

    course: {type: mongoose.Schema.Types.ObjectId, ref: "Course"}
    

},
{ timestamps: true }
)
