const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');

const user = require('./routes/api/users');
const post = require('./routes/api/posts');
// const profile = require('./routes/api/profiles');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//DB CONFIG
const db= require('./config/key').mongoURI;

// connect to mongoo db
mongoose
.connect(db ,
    {useUnifiedTopology: true , useNewUrlParser: true})
.then(()=> {
    console.log("mongodb connected");
})
.catch(
    err => console.log(err) 
)

// app.get('/', (req, res) => res.send('Hello!'));
// app.use(passport.initialize());

//passport configuration
// require('./config/passport')(passport);

app.use('/api/users', user);
app.use('/api/posts', post);
// app.use('/api/profiles', profile);



const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server running on Port ${port}`));





