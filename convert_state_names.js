const fs = require('fs');
const stateObjs = require('./state-names.json');

const apNames = fs.readFileSync('./state-abbr.txt', 'utf8');

function formatNames() {
  const stateArr = [];
  let apName = '';
  const apArr = apNames.split('\n');

  apArr.forEach(line => {
    const apState = line.split(' ')[0];
    const zip = line.split(' ')[1] ? line.split(' ')[1].substr(1,2) : null;

    stateObjs.forEach(state => {
      if (state.abbreviation === zip) {
        apName = apState;
        stateArr.push({
          name: state.name,
          abbreviation: state.abbreviation,
          apName
        });
      }
    });
  });

  console.log(stateArr);

  const results = fs.writeFile('apStateNames.json', JSON.stringify(stateArr), 'utf8', (err, data) => {
    if (err) throw err;
    console.log('file saved');
  });

  return results;
}

formatNames();
