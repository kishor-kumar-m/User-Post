import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import postRoutes from './routes/posts'
import cors from 'cors'



const app = express()
app.use(morgan('dev'));

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/Insta');
mongoose.connection.once('open',function(){
  console.log('DB connected');
}).on('error',function(error){
  console.log('error is:',error)
})

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('uploads'));
app.use(cors());

app.use(function (req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type');
    res.setHeader('Access-Control-Allow-Credentials',true);

    next();
})


app.use('/user', userRoutes)
app.use('/post',postRoutes)

app.use((req, res, next) => {
    const error =new Error("not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});





app.listen(port, () =>{
    console.log(`Server running on ${port}`)
})




