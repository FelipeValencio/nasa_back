const express = require("express")
var bodyParser = require('body-parser')

const dataFilter = require("./data_filter.js")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, Authorization"
    );
    next();
  });

var port = 3000;

app.listen(port, () =>  console.log(`Listening on ${port}`))

app.get("/getAllData", async (req, res) => {

    try{

        var table = await dataFilter.getAllData();
 
        res.status(200)
        res.json(table)
 
    }catch(err) {

        res.status(500)
        res.send("Internal Error: " + err)
        
    }

});

app.get("/getCountry/:c", async (req, res) => {

    try{

       var table = await dataFilter.getCountryData(req.params.c)

       res.status(200)
       res.json(table)

    }catch(err) {

        res.status(500)
        res.send("Internal Error: " + err)
        
    }
})






