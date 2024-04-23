const Get_Data = require("./DataFetcher.js");
const fs = require("fs")

async function UpdateViews(){

    const jsonData = fs.readFileSync("./Data.json");
    const ytData = JSON.parse(jsonData);
    
    for (const key in ytData) {
        
        let NewData = await Get_Data(ytData[key].URL)
        const NewViews = NewData[1]
        
        ytData[key].OLD_Views = NewViews
        

    }
    //Updating file 
    fs.writeFileSync("./Data.json", JSON.stringify(ytData));
}

module.exports = UpdateViews