const passport = require('passport');
const User = require('../models/User');

exports.postSignup = (req,res,next)=>{
    const newUsuer = new User({
        email : req.body.email,
        nombre : req.body.nombre,
        password : req.body.password,
    });

    User.findOne({email:req.body.email},(err,data)=>{
        if(data){
            return res.status(400).send('Ese email ya esta registrado');
        }
        newUsuer.save((err)=>{
            if(err){next(err);}
            req.logIn(newUsuer,(err)=>{
                if(err){next(err);}
                res.send('usuario creado exitosamente');
            })
        })
    })
}

exports.postLogin = (req,res,next)=>{
    //Aqui estamos utilizando esta funcion como callback de model user
    passport.authenticate('local',(err,user,info)=>{
        if(err){next(err);}
        if(!user){
            return res.status(400).send('Email o contraseña no validos');
        }
        req.logIn(user,(err)=>{
            if(err) {next(err);}
            res.send('Login exitoso');
        });
    })(req,res,next);
}

exports.logout = (req,res) =>{
    req.logout();
    res.send('Logout exitoso');
}