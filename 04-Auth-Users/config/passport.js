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