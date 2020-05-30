const neatCsv = require('neat-csv');
const fs = require('fs');

var file = "../official_data_base.csv"
var table;

module.exports.getAllData = async function () {
    
    if(table == undefined ) table = await getCSV()
    
    return table
    
}

module.exports.getCountryData = async function(countryInitials) {
    
    if(table == undefined) table = await getCSV();

    var newTable = [];

    for(var i = 0; i < table.length; i++){

        if(table[i].Initials === countryInitials){

            newTable.push(table[i])   
            
            if(table[i + 1].Initials !== countryInitials) break;
        }
        
    }

    return newTable;

}

async function getCSV() {
    try{

        if(!fs.existsSync(file)) throw "File not found " + file;

        var data = fs.readFileSync(file);

        table = await neatCsv(data)
            .catch((err) => {throw err})
    
        return table

    }catch(err) {

        console.log(err)
        throw err
        
    }
}