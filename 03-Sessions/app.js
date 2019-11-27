const express = require('express');
const session = require('express-session');
//Importamos connect-mongo este modulo recibe como segundo parametro
//al momento de importarlo el modulo session
const MongoStore = require('connect-mongo')(session);

const MONGO_URL = 'mongodb+srv://<user>:<password>@cluster0-zrsf9.mongodb.net/test?retryWrites=true&w=majority';


const app = express();
app.set('port',process.env.PORT||3000);
const PORT = app.get('port');

/* De inicio este es un middleware que nos permite ocupar sesiones
ocupa un objeto de configuarcion, 
    secret : es un string que utiliza como seed para incriptar los id enviado al cliente
        idelamente tiene que se aleatorio el strinh
    resave : fuerza al servidor a guardar los datos sin importar si hubieron cambios o no
    saveUninitialized : Guarda informacion de la sesion aun que este vacia si esta activa en true

    express-session : para guardar la informacion de las sessiones por defecto utiliza la memoria 
    de la computadora, es decir que si el proceso se parase pierde toda la información de los usuarios
    
*/
app.use(session({
    secret : "ESTO ES SECRETO",
    resave : true,
    saveUninitialized : true,
    store : new MongoStore({
        url : MONGO_URL,
        autoReconnect : true
    }),
}));

app.get('/',(req,res)=>{
    //Propiedad creada dinamicamente "cuenta" 
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
    res.send(`Hola has visto esta pagina : ${req.session.cuenta} `);
});

app.listen(PORT,()=>{
    console.log(`Server run in port ${PORT}`);
});