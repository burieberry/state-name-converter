const fs = require('fs');
const stateObjs = require('./source-output/apStateNames.json');

const allStates = fs.readFileSync('./input-data/giving-back-old.csv', 'utf8');

function convertStates() {
  let results = '';
  let convertedName = '';
  const lines = allStates.split('\r');

  console.log(lines)

  lines.forEach(line => {
    const city = line.split(',')[0];
    const state = line.split(',')[1];

    stateObjs.forEach(obj => {
      if (state == obj.name) {
        convertedName = obj.apName;
        results += `${city}, ${convertedName}\n`;
      }
    });
  }, 1);

  console.log(results);

  const resultFile = fs.writeFile('results-data/giving-back-ap.csv', results, 'utf8', (err, data) => {
    if (err) throw err;
    console.log('file saved');
  });

  return resultFile;
}

convertStates();
