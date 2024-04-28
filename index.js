import express from 'express';
import fs from "fs"; //modulo para trabajar con mis archivos del proyecto
import bodyParser from "body-parser"; 

const app = express();
app.use(bodyParser.json());//para q interpreta mi estructura json

//funcion leer datos
const readData = () => {
    try{
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) =>{
    try{
       fs.writeFileSync("./db.json", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }

};


app.get("/", (req, res) => {
    res.send ("welcome to server!");
});



//metodo get:solicitar todos los datos
app.get("/mascotas", (req, res) => {
    const data = readData();
    res.json(data.mascotas); 
});


//solicitar datos por id
app.get("/mascotas/:Id", (req, res) =>{
    const  data = readData();
    const Id = parseInt(req.params.Id);
    const mascotas= data.mascotas.find((mascotas) => mascotas.Id === Id);
    res.json(mascotas);
});



//metodo post: enviar datos
app.post("/mascotas", (req, res) => {
const data= readData(); 
const body=req.body //mando la mascota nueva al body de json
const newMascota = {
    Id:data.mascotas.length + 1,
    ...body, //???
};
data.mascotas.push(newMascota);
writeData(data); //para pasar los datos
res.json(newMascota);
});


// metodo put: actualizar datos
app.put("/mascotas/:Id", (req,res) => {
    const data= readData();
    const body=req.body 
    const Id = parseInt(req.params.Id); //extrae el ID 
    const mascotasIndex = data.mascotas.findIndex((mascotas) => mascotas.Id === Id);
    data.mascotas[mascotasIndex] ={
        ...data.mascotas[mascotasIndex],
        ...body
    };
    writeData(data);
    res.json({message: "Info mascota actualizada"});
});



// metodo delete: eliminar datos
app.delete("/mascotas/:Id", (req, res) => {
    const data=readData();
    const Id= parseInt(req.params.Id);//?
    const mascotasIndex= data.mascotas.findIndex((mascotas) => mascotas.Id === Id); //?
    data.mascotas.splice(mascotasIndex, 1); //me permite borrar pasandole el (index) ? jddujhjs
    writeData(data);
    res.json({message:"elemento borrado"});
});


app.listen(3000, () => {

    console.log('server listening on port 3000');

});
