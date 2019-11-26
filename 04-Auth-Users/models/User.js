const bcrypt = require('bcrypt-nodejs'); //libreria para encriptar - instalada npm i bcrypt-nodejs
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*con timestamps son datos que se guardan automaticamente, 
cuando se crea usuario y se actualiza*/
const userSchema = new Schema({
    email:{type: String,unique:true,lowercase:true,required:true},
    password:{type:String,required:true},
    name : {type:String,required:true},
},{
    timestamps : true
})

/*Esta funcion es antes del metodo save, esta funcion va a configurar los 
datos antes del guardado en la base de datos*/
userSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified('password')){
        return next();
    }

    //Generamos un salt con 10 interaciones
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            next(err);
        }
        /* usuamos un hash para la contraseña, lo primero que pasamos es la contraseña del usuario
        luego pasamos el salt generado en el metodo anterior, el tercer parametro lo ponemos en null, aqui va una
        funcion en relacion del progreso de como va la criptografia, y por ultimo pasamos una funciton que
        recibe el error en caso de que ocurriera y el hash que hemos creado */
        bcrypt.hash(user.password,salt,null,(err,hash)=>{
            if(err){
                next(err)
            }
            user.password = hash;
            next();
        })
    })
})

//equalsPassword metodo definido por nosotro
userSchema.methods.equalsPassword = function(password,callback){
    /*El primer parametro es la password con la que el usuario hace el login y la segunda es  
    la que esta almacenada en al base de datos, el tercer parametro va ser una funcion que va 
    a ser invocada al comparar el primer parametro es en caso de error y el segundo un resultado booleando */
    bcrypt.compare(password,this.password,(err,equals)=>{
        if(err){
            return callback(err); //en caso de que hubiera algun error llamamos al callback con el error
        }
        callback(null,equals);
    })
}

module.exports = mongoose.model('user',userSchema);