'use strict';
let readline = require("readline");
readline = readline.createInterface(process.stdin, process.stdout);
const Database = require("./Database.js");
const db1 = new Database();

const funcionar = async()=>{
    await db1.creatingClient();
    let opcion;
    let respuesta;
    do{
        await db1.listTables();
        opcion = await question("Digite opcion:\t");
        let attributes;
        let table;
        let values;
        
        switch(opcion){
            
            case '1':
                table = await question("table:\t");
                attributes = (await question("attributes:\t")).split(",");
                await db1.selectQuery(table,attributes);
            break;
            case '2':
                table = await question("table:\t");
                attributes = (await question("attributes:\t")).split(",");
                values = (await question("values:\t")).split(",");
                await db1.insertQuery(table,attributes,values);
            break;

        }
        respuesta = await question("Desea seguir: ");
    }while(respuesta == '1');
    process.exit(1);
}
funcionar();


async function question(question){
        return new Promise((res,rej)=>{
            readline.question(question,answer=>res(answer));
        })
    
}
//