const { insertData, getData, getQues } = require('../Repositories/userDb');

async function calculateAndInsertData(user) {
  try {
    return await insertData(user)
  }
  catch (err) {
    throw err
  }
};
// Getting user data and calculating Score
async function getDataFromDb(user) {
  var result
  try {
    result = await getData(user)
    if (typeof (result) != 'object') {
      throw "Something went wrong"
    }
    var sum = 0
    var riskLabel
    for (var i = 1; i <= Object.keys(result[0].USERDATA).length; i++) {
      sum = sum + result[0].USERDATA[i].score
    }
    switch (true) {
      case sum == 0 && sum <= 10:
        riskLabel = "Conservative"
        break
      case sum >= 11 && sum <= 20:
        riskLabel = "Moderate Conservative"
        break
      case sum >= 21 && sum <= 30:
        riskLabel = "Moderate"
        break
      case sum >= 31 && sum <= 40:
        riskLabel = "Moderate Aggressive"
        break
      default:
        riskLabel = "Aggressive"
        break
    }
    return { sum, riskLabel };
  }
  catch (err) {
    throw err;
  }
};

async function getQuesFromDb() {
  try {
    return await getQues()
  }
  catch (err) {
    throw err
  }
};

module.exports = { calculateAndInsertData, getDataFromDb, getQuesFromDb }