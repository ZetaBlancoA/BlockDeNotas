const { constants, INSPECT_MAX_BYTES } = require('buffer');
const fs = require('fs');
const readline = require('readline'); 
const rl = require('readline-sync'); 
const internal = require('stream');



const escribir = (data) => {
    data.forEach(tarea => {
        console.log(`La tarea ${tarea.titulo} esta ${tarea.estado}`)
    });
};

const escribirJSON = (databases) =>{

        let arrays = ["titulo", "estado"];
        let resultado = [];

        for(let i=0;i<2;i++) {
            resultado.push(rl.question(`Ingrese un ${arrays[i]}:`));
        }
        console.log(`,{"titulo":${resultado[0]}","estado":"${resultado[1]}"}`) 
        let data = {titulo:resultado[0],estado:"pendiente"} 

        databases.push(data) 

        let json_data = JSON.stringify(databases, null, 4);
        fs.writeFileSync('./tareas.json', json_data);
    };

const tareas = require ('./tareas.json')

const comando = process.argv[3]
const filtrarPorEstado = tareas.filter ((item)=> item.estado==comando);
    
fs.readFile('./tareas.json', 'utf8', (err, data) => {
        const databases = JSON.parse(data);
    
        switch (process.argv[2]) {
            case "listar":
                escribir (databases)
                break;
            case "crear":
                escribirJSON (databases)
                break;
            case "filtrar":
                console.log(filtrarPorEstado)
                break;
            case undefined:
                console.log("Atención - Tienes que pasar una acción.");
                break;
            default:
                console.log("No entiendo que quieres hacer.");
        }       
});


  

    

