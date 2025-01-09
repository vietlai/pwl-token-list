const fs = require('fs');

const diff = fs.readFileSync('tokenlist.added', 'utf-8');

const addedLines = diff
  .split('\n')
  .filter((line) => line.startsWith('+') && !line.startsWith('+++'));

const newTokens = [];
let currentToken = {};

addedLines.forEach((line) => {
  if (line.includes('"chainId":')) {
    currentToken.chainId = parseInt(line.split(':')[1].trim().replace(',', ''), 10);
  } else if (line.includes('"address":')) {
    currentToken.address = line.split(':')[1].trim().replace(/"|,/g, '');
  } else if (line.includes('"logoURI":')) {
    currentToken.logo = line.split(':')[1].trim().replace(/"|,/g, '');
  } else if (line.includes('}')) {
    if (Object.keys(currentToken).length > 0) {
      newTokens.push(currentToken);
      currentToken = {};
    }
  }
});

console.log(JSON.stringify(newTokens, null, 2));
