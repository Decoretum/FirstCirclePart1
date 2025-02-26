//NodeJS Version = 20.18.3

//CLI Format = `node app.js n={} f={}`

const express = require('express');
const fs = require('fs');
const path = require('path');
const { stringify } = require('csv-stringify');
const readline = require('readline');

const app = express();

//The amount of requests
//'n' in CLI
cli1 = process.argv[2].slice(2);


//The format
//'f' in CLI
cli2 = process.argv[3].slice(2);


async function dataHandler (arg2, json)
{
    if (arg2 === 'console')
    {
        console.log(json);
        return 1;
    } else if (arg2 === 'json')
    {
        //Get Number of Files for naming marker
        j = 1;
        const folderName = './Files';
        fs.readdirSync(folderName).forEach(file => {
            pathname = path.extname(file);
            if (pathname === '.json') j++;
        }) 
        
        await fs.promises.writeFile(`./Files/response${j}.json`, JSON.stringify(json, null, 2));
        console.log(`\n\nJSON File "response${j}.json" has been successfully downloaded!`);
        return 1;
          
    } else {
        //Get Number of Files for naming marker
        c = 1;
        const folderName = './Files';
        fs.readdirSync(folderName).forEach(file => {
            pathname = path.extname(file);
            if (pathname === '.csv') c ++;
        })

        const columns = Object.keys(json['results'][0])
        const results = json['results']
        
        const result = await new Promise((res, rej) => {
            stringify(results, {header: true, columns: columns}, (error, output) => {
                if (error) rej(error);
                else res(output)
            })
        }); 

        await fs.promises.writeFile(`./Files/response${c}.csv`, result);
        console.log(`\n\nCSV File "response${c}.csv" has been successfully downloaded!`);
        return 1;
    
    }

}

function promptQuery()
    {
        const int = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        int.question('Do you want to continue ingesting data? Choices: ["Yes", "No"]\n', (answer) => {
            if (answer === 'Yes')
            {
                int.question("Type your Parameters Again, Format = n={} f={}\n", (params) => {
                    arr = params.split(" ");
                    n = arr[0].slice(2);
                    format = arr[1].slice(2);
                    int.close();
                    processRequest(n, format);
                })
            } else {
                condition = false;
                int.close();
            }
        }) 
    }

async function processRequest(n, format) {

    try {
        const req = new Request(`https://opentdb.com/api.php?amount=${n}`, {
        method : 'GET'
    }); 
    
        const res = await fetch(req);
        const json = await res.json();
        const handle = await dataHandler(format, json);
        if (handle === 1) promptQuery();

    } catch (error) {
        console.log(error);
    }
    
}

app.listen(3000, async () => {
    console.log("Backend Server Started");
    console.log("Processing User Input")

    n = cli1;
    format = cli2;

    const process1 = await processRequest(n, format);
      
})
