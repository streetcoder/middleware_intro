const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

// morgan('tiny');

app.use(morgan('tiny'))

app.use((req,res,next) =>{
    console.log(req.method.toUpperCase());
    next();
})


// app.use((rer, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWARE!!!")
//     next();
// })
// app.use((rer, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWARE!!!")
//     next();
// })



app.use((req, res, next) => {
     req.requestTime = Date.now()
     console.log(req.method, req.path);
     next();
})

app.get('/', (req, res) => {    
    res.send('Home Page');
})

app.get('/error', (req, res) => {
    chicken.fly()
})

app.get('/dogs', (req, res) => {
    console.log("THIS IS MY THIRD MIDDLEWARE!!!")
    res.send('Woof Woof!!');
})    

const verifyPassword = (req, res, next) => {
    const {password}= req.query;
    if(password === 'chickennugget'){
        next();
    }
    throw new AppError('password required!', 401)
    // res.send("PASSWORD NEEDED!")
    // throw new Error('Password Required!')
}
app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometime I wear headphones in public...')
})

app.get('/admin', (req, res ) => {
    throw new AppError('You are not an Admin!', 403)
})

// not found 
app.use((req, res) => {
    res.status(404).send('Not Found!')
})

app.use((err, req, res, next) => {
    // console.log("********************************")
    // console.log("********************************")
    // console.log("********************************")
    // console.log(err)
    // next(err)
    const {status = 500, message = 'Something Went Wrong'} = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})