/*passport nos sirve para configurar las sesiones con la base de datos */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

/*EL primer parametro es el usuario con toda la informacion de nuestro usuario 
el segundo parametro es el callback  */
passport.serializeUser((user,done)=>{
    //el null es por que no ocurrio ningun error a la hora de ser serailizado
    //y en el segundo vamos a pasarle el usuario, entonces va a crear un cookie para cada usuario
    done(null,user._id); //Con esto vamos a identificar el usuario
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
});

passport.use(new LocalStrategy(
    {usernameField:'email'},
    (email,password,done)=>{
        User.findOne({email},(err,user)=>{
            if(!user){
                return done(null,false,{message:`Este email: ${email} no esta registrado`});
            } else {
                User.equalsPassword(password,(err,equals)=>{
                    if(equals){
                        return done(null,usuario);
                    } else {
                        return done(null,false,{message : 'La contraseña no es valida'});
                    }
                })
            }
        })
    }
))

exports.isAuth = (req,res,next) => {
    if(req.isAuthentificated()){
        return next();
    }
    res.status(401).send('Tienes que hacer login para acceder a este recurso');
}