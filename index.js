const express = require('express');
const app = express();
const morgan = require('morgan');

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
     const {password} = req.query;
     if(password === 'chickennugget'){
        next()
     }
     res.send('SORRY YOU NEED A PASSWORD')
})


app.get('/', (req, res) => {    
    res.send('Home Page');
})    
app.get('/dogs', (req, res) => {
    console.log("THIS IS MY THIRD MIDDLEWARE!!!")
    res.send('Woof Woof!!');
})    

// not found 
app.use((req, res) => {
    res.status(404).send('Not Found!')
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})