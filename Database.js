const {Client} = require("pg");

class Database{

    constructor(){
        console.log(Client);
        console.log("Hola");
        this.client = null;
    }
    async creatingClient(){
        this.client = new Client({
            user:"postgres",
            host:"localhost",
            port:5432,
            password:"laura2201",
            database:"test"
        });
        await this.conectingClient();
    }
    async conectingClient(){
        try {
            await this.client.connect();
            console.log("client connected");
        } catch (error) {
            console.log("client not connected");
        }
    }
    getAttString(attributes,flag){
        
        let columns = ``;
        for(let i=0;i<attributes.length;i+=1){
            if(flag==1){
                columns+=attributes[i]+",";
            }else{
                columns+= "\'".concat(attributes[i]).concat("\'")+",";
            }
            
        }
        columns = columns.substring(0,columns.length-1);
        return columns;
    }
    async selectQuery(table,attributes){
    
        const query = `SELECT ${this.getAttString(attributes,1)} FROM ${table};`;
        try {
            const res = await this.client.query(query);
            console.log("well done");
            res.rows.forEach(element=>{
                console.log(element);
            })
        } catch (error) {
            console.log("error\n");
            console.log(error);
        }
        
    }
    async readQuery(table,attributes,pk,operator,value){
        const query = `SELECT ${this.getAttString(attributes,1)} FROM ${table} WHERE ${pk} ${operator} ${value}`;
        try {
            const res = await this.client.query(query);
            console.log("well done");
            if(res.rowCount!=0){
                res.rows.forEach(element=>{
                    console.log(element);
                })
            }else{
                console.log("No register with those conditions");
            }
            
        } catch (error) {
            console.log("error\n");
            console.log(error);
        }
    }
    async insertQuery(table,attributes,values){
        values = this.getAttString(values,2);
        attributes = this.getAttString(attributes,1);
        console.log(attributes);
        console.log(values);
        const query = `INSERT INTO ${table}(${attributes}) VALUES(${values});`;
        console.log(query);
        // const query = `INSERT INTO ${table} VALUES (${values})`;
        try {
            const res = await this.client.query(query);
            console.log("was registered succesfully");
        } catch (error) {
            console.log("Error");
            console.log(error);
            
        }
        // return;
    }
    async listTables(){
        const query = `SELECT
        table_schema || '.' || table_name
    FROM
        information_schema.tables
    WHERE
        table_type = 'BASE TABLE'
    AND
        table_schema NOT IN ('pg_catalog', 'information_schema');`
        try {
            const res = await this.client.query(query);
            console.log("Tables");
            res.rows.forEach((tab)=>{
                console.log("\t"+tab['?column?'].split(".")[1]);
                console.log("");
            });
        } catch (error) {
            console.log(error);
        }
        
    }
    async updateQuery(){
        return null;
    }

    

}
module.exports = Database;