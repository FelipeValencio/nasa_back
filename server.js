const express = require("express")
var bodyParser = require('body-parser')

const dataFilter = require("./data_filter.js")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

var port = 3000;

app.listen(port, () =>  console.log(`Listening on ${port}`))

app.get("/getAllData", async (req, res) => {

    try{

        var table = await dataFilter.getAllData();
 
        res.statusCode = 200;
        res.send(table);
 
    }catch(err) {

        res.statusCode = 500
        res.send("Internal Error: " + err)
        
    }

});

app.get("/getCountry/:c", async (req, res) => {

    try{

       var table = await dataFilter.getCountryData(req.params.c);

       res.statusCode = 200;
       res.send(table);

    }catch(err) {

        res.statusCode = 500
        res.send("Internal Error: " + err)
        
    }
})






