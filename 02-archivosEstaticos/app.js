var express = require("express");

var app = express();

/* Ponemos servir archivos estaticos como imagenes, css, js
    atraves de esto los podemos encontrar en la url
    http:localhost:3000/css/app.css donde la carpeta es public/css/app.css
    Como nota final podemos tener mas de un direcotrio de archivos estaticos
*/
app.use(express.static('public'));


app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
});

app.listen(3000,()=>{
    console.log("Sever run in port 3000");
    
});