const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./config/passport');

const MONGO_URL = 'mongodb+srv://<user>:<password>@cluster0-zrsf9.mongodb.net/test?retryWrites=true&w=majority';
const app = express();
app.set('port',process.env.PORT||4200);
const PORT = app.get('port');

//configuramos a mongoose para poder usar las promesas
mongoose.Promise = global.Promise;
mongoose.createConnection(MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.on('error',(err)=>{
    throw err;
    process.exit(1);
})

app.use(session({
    secret : 'Seeder cero',
    resave : true,
    saveUninitialized : true,
    store : new MongoStore({
        url : MONGO_URL,
        autoReconnect : true
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// app.get('/',(req,res)=>{
//     req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
//     res.send(`Hola! Has visto esta pagina ${req.session.cuenta}`);
// })

const userController = require('./controllers/user');
app.post('/signup', userController.postSignup );
app.post('/login',userController.postLogin);
app.post('/logout', passportConfig.isAuth ,userController.logout);

app.get('/usuarioInfo',passportConfig.isAuth,(req,res)=>{
    res.json(req.user);
});

app.listen(PORT,()=>{
    console.log(`Server run in port ${PORT}`);
});