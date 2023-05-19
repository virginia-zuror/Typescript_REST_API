import mongoose, { Schema } from "mongoose";





const Course = new Schema (

  {
    id: {
        type: Number,
        trim:true,
    },

    seqNo:{
        type: Number,
        trim:true,
    },

    title:{
        type: String,
        trim:true,
    },

    iconUrl: {
        type: String,
        trim:true,
    },

    longDescription: {
        type: String,
        trim:true,
    },

    category: {
        type: String,
        trim:true,
    },

    lessons: [{type: mongoose.Schema.Types.ObjectId, ref:'Lesson'}],

},
{ timestamps: true },
)



