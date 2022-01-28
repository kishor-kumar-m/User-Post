import express from 'express'
import mongoose from 'mongoose'
import Post from '../models/post'
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
import multer from 'multer'


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,'-') + file.originalname)
    }
});

const upload = multer({storage:storage});  

router.post('/createPost',checkAuth,upload.single('photo'),(req,res,next) =>{
    const {title,body} = req.body
    const user = req.userData
    const data = user.userId
    if(!title || !body){
        res.status(422).json({
            error : "Please enter title and body"
        })
    }
    const post = new Post({
        title,
        body,
        postedBy : data,
        photo : req.file.path
    })
    
    post.save()
    .then(result =>{
        res.status(201).json({
            post:result
        })
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    })
})


module.exports = router;