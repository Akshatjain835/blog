import express from "express";
import mongoose from "mongoose";


const blogSchema=new mongoose.Schema({
    title:{ 
        type:String,
        required:true,

    },
    blogimage:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    category:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
        minlength:[200,"The length should contain at least 200 characterrs"],
    },
    adminname:{
        type:String,
        // required:true,
    },
    adminphoto:{
        type:String,
            // required:true,
    },
    createdBy:{  //we are taking data from user model that is why we are using the ref tag to pass the refernce of the model that we are using
        type:mongoose.Schema.ObjectId, //get the type of that model who is creating the blog 
        ref:"user"  //we are passing the ref of the usermodel that is user
    },

})

export const blog=mongoose.model("blog",blogSchema);