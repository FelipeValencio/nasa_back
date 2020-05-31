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
            confirmedChange: [],
            deaths: [],
            deathsChange: [],
            recovered: [],
            recoveredChange: [],
            retail: [],
            grocery: [],
            parks: [],
            station: [],
            workplaces: [],
            residential: [],
            dates: []
        },
        {
            country: "FR",
            confirmed: [],
            confirmedChange: [],
            deaths: [],
            deathsChange: [],
            recovered: [],
            recoveredChange: [],
            retail: [],
            grocery: [],
            parks: [],
            station: [],
            workplaces: [],
            residential: [],
            dates: []
        },
        {
            country: "DE",
            confirmed: [],
            confirmedChange: [],
            deaths: [],
            deathsChange: [],
            recovered: [],
            recoveredChange: [],
            retail: [],
            grocery: [],
            parks: [],
            station: [],
            workplaces: [],
            residential: [],
            dates: []
        },
        {
            country: "IT",
            confirmed: [],
            confirmedChange: [],
            deaths: [],
            deathsChange: [],
            recovered: [],
            recoveredChange: [],
            retail: [],
            grocery: [],
            parks: [],
            station: [],
            workplaces: [],
            residential: [],
            dates: []
        },
        {
            country: "JP",
            confirmed: [],
            confirmedChange: [],
            deaths: [],
            deathsChange: [],
            recovered: [],
            recoveredChange: [],
            retail: [],
            grocery: [],
            parks: [],
            station: [],
            workplaces: [],
            residential: [],
            dates: []
        },
        {
            country: "GB",
            confirmed: [],
            confirmedChange: [],
            deaths: [],
            deathsChange: [],
            recovered: [],
            recoveredChange: [],
            retail: [],
            grocery: [],
            parks: [],
            station: [],
            workplaces: [],
            residential: [],
            dates: []
        },
        {
            country: "US",
            confirmed: [],
            confirmedChange: [],
            deaths: [],
            deathsChange: [],
            recovered: [],
            recoveredChange: [],
            retail: [],
            grocery: [],
            parks: [],
            station: [],
            workplaces: [],
            residential: [],
            dates: []
        },
    ];

    for(var i = 0; i < tableList.length; i++) {
        
        for(var j = 0; j < data.length; j++) {

            if(data[j].Initials === tableList[i].country){

                tableList[i].confirmed.push(data[j].Confirmed)

                tableList[i].confirmedChange.push(data[j].ConfirmedChange)

                tableList[i].deaths.push(data[j].Deaths)

                tableList[i].deathsChange.push(data[j].DeathsChange)

                tableList[i].recovered.push(data[j].Recovered)

                tableList[i].recoveredChange.push(data[j].RecoveredChange)

                tableList[i].retail.push(data[j].retail_and_recreation)

                tableList[i].grocery.push(data[j].grocery_and_pharmacy)

                tableList[i].parks.push(data[j].parks)

                tableList[i].station.push(data[j].transit_stations)

                tableList[i].workplaces.push(data[j].workplaces)

                tableList[i].residential.push(data[j].residential)

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