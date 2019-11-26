var http = require("http"), //libreria para peticiones
    fs = require("fs"); //libreria para leer archivos

http.createServer((req,res)=>{
    fs.readFile("./index.html",(err,html)=>{
        /*  1 - <<res.write>> nos permite enviar por partes informacion esto quiere decir
                que la peticion se queda abierta hasta que se cierra con un <<res.end>> 
            2 - res.writeHead permite enviar un status y definir nuestras cabeceras
                ESTE PUNTO ES OPCIONAL aun que en ciertos casos puede ayudar a resolver ciertos problemas
            */
        res.writeHead(200,{"Content-Type":"application/json"});
        res.write(JSON.stringify({name:"NAME",username:"USERNAME"}));
        res.end();
        /*Podemos obtener nuestra respuesta atraves del navegador o con una
            peticion << curl -I localhost:3000 >> para obtener las cabeceras
            y << curl localhost:3000 >> para ver el cuerpo de la respuesta */
    });
}).listen(3000,()=>{
    console.log('Server run port 3000');
    
});