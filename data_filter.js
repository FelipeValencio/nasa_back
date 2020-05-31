const neatCsv = require('neat-csv');
const fs = require('fs');

var file = "../official_data_base.csv"
var table;

module.exports.getAllData = async function () {
    
    if(table == undefined ) table = await getCSV()

    return formatData(table)
    
}

module.exports.getCountryData = async function(countryInitials) {
    
    if(table == undefined) table = await getCSV();

    var newTable = [];

    for(var i = 0; i < table.length; i++){

        if(table[i].Initials === countryInitials) {

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

//método para criar array de objeto tableList
function formatData(data) {

   try{

    var tableList = [
        {
            country: "CA",
            confirmed: [],
            deaths: [],
            recovered: [],
            dates: []
        },
        {
            country: "FR",
            confirmed: [],
            deaths: [],
            recovered: [],
            dates: []
        },
        {
            country: "DE",
            confirmed: [],
            deaths: [],
            recovered: [],
            dates: []
        },
        {
            country: "IT",
            confirmed: [],
            deaths: [],
            recovered: [],
            dates: []
        },
        {
            country: "JP",
            confirmed: [],
            deaths: [],
            recovered: [],
            dates: []
        },
        {
            country: "GB",
            confirmed: [],
            deaths: [],
            recovered: [],
            dates: []
        },
        {
            country: "US",
            confirmed: [],
            deaths: [],
            recovered: [],
            dates: []
        },
    ];

    for(var i = 0; i < tableList.length; i++) {
        
        for(var j = 0; j < data.length; j++) {

            if(data[j].Initials === tableList[i].country){

                tableList[i].confirmed.push(data[j].Confirmed)
                tableList[i].deaths.push(data[j].Deaths)
                tableList[i].recovered.push(data[j].Recovered)
                tableList[i].dates.push(data[j].Date)

                if(data[j + 1] != undefined && data[j + 1].Initials !== tableList[i].country) break;
            }
        }

        tableList[i].country = countryName(tableList[i].country)

    }    

    return tableList;

   }catch(err) {
       console.log(err);
       throw err;
   }

}

function countryName(init) {
    switch(init) {
        case "CA": return "Canada"
        case "FR": return "France"
        case "DE": return "Germany"
        case "IT": return "Italy"
        case "JP": return "Japan"
        case "GB": return "United Kingdom"
        case "US": return "United States"
    }
}