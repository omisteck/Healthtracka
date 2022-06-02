const axios = require('axios');
let db = require('../database/IPLocationDB.json');
const config = require('../config/keys');
const HttpError = require('../exceptions/http.error');
const { writeFile } = require('fs');
const path = require('path');

module.exports.check = (needle) => {
  let found = db.find((record) => {
    return record.domain == needle;
  })
  if (found) {
    return found;
  }
  return null;
}

module.exports.getDetails = async (domain) => {
  try {
    let details = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${config.IPGEOLOCATION_API_TOKEN}&ip=${domain}`,
    )
    return details.data;
  } catch (error) {
    throw new HttpError({
      message: error.message,
      status: 500,
      data: error.response.data
    });
  }

}

module.exports.save = (record) => {

  writeFile(path.join(__dirname, '..', 'database', 'IPLocationDB.json'),
    JSON.stringify(record, null, 2),
    'utf8',
    (err) => {
      if (err) {
        console.log('Failed to write updated data to file');
        return;
      }
      console.log('Updated file successfully');
    });
}