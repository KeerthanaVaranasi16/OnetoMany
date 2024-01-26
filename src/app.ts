import "reflect-metadata"
import express from "express"
// import dataSource from "./DataSource/dataSource"
import dataSource from './DataSource/dataSource'
import router from "./Routes/routes";

const app=express();
const port=3000;
app.use(express.json())
app.use('/',router)

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

app.listen(port,function(){
    console.log("Connected")
})