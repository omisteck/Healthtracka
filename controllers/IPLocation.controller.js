const { validationResult } = require('express-validator');
const BadRequestException = require('../exceptions/badRequest.exception');
let db = require('../database/IPLocationDB.json');
const utils = require('../utils/utils');


module.exports.verify = async (req, res, next) => {
  const errors = validationResult(req);

  //check if there are errors

  if (!errors.isEmpty()) {
    next(new BadRequestException(
      errors.array()[0].msg,
      errors.array()
    ));
  }


  let { domain: requestedDomain } = req.body;

  //checking if is in db 
  let record = utils.check(requestedDomain)

  if (record == null) {
    // checking details from ipgeolocation api
    let newRecord = await utils.getDetails(requestedDomain);

    //deconstructing the object
    let {
      domain, longitude, latitude, geoname_id,
    } = newRecord
    //reforming object
    let formated = {
      id: db.length + 1,
      domain, longitude, latitude, geoname_id,
      isActive: true
    }

    db.push(formated);

    //saving to db
    utils.save(db);

    //returning the object
    record = formated;

  };
  res.send(record);
}

module.exports.getAll = (req, res, next) => {
  console.log('sd');
  if (req.query.isActive) {
    // isActive is filter
    switch (req.query.isActive) {
      case 'true':
        res.send(db.filter(record => record.isActive == true));
        break;

      case 'false':
        res.send(db.filter(record => record.isActive == false));
        break;
    }

  }
  res.send(db);
}


module.exports.show = (req, res, next) => {

  const errors = validationResult(req);

  //check if there are errors

  if (!errors.isEmpty()) {
    next(new BadRequestException(
      errors.array()[0].msg,
      errors.array()
    ));
  }

  
  let { id } = req.params
  let data = db.find(record => record.id == id);
  if (data) {
    res.send(data);
  } else {
    next(new BadRequestException('record not found'));
  }
}


module.exports.show = (req, res, next) => {

  const errors = validationResult(req);

  //check if there are errors

  if (!errors.isEmpty()) {
    next(new BadRequestException(
      errors.array()[0].msg,
      errors.array()
    ));
  }

  
  let { id } = req.params
  let data = db.find(record => record.id == id);
  if (data) {
    res.send(data);
  } else {
    next(new BadRequestException('record not found'));
  }
}



module.exports.update = (req, res, next) => {

  const errors = validationResult(req);

  //check if there are errors

  if (!errors.isEmpty()) {
    next(new BadRequestException(
      errors.array()[0].msg,
      errors.array()
    ));
  }

  let { id: requestID  } = req.params
  let { id, domain, longitude, latitude, geoname_id, isActive } = req.body;

  let dataIndex = db.findIndex(record => record.id == requestID);
  if ( db[dataIndex]) {
    db[dataIndex] = {
      id, domain, longitude, latitude, geoname_id, isActive
    };
    utils.save(db);
    res.send(db[dataIndex]);
  } else {
    next(new BadRequestException('record not found'));
  }
}



module.exports.delete = (req, res, next) => {

  const errors = validationResult(req);

  //check if there are errors

  if (!errors.isEmpty()) {
    next(new BadRequestException(
      errors.array()[0].msg,
      errors.array()
    ));
  }

  let { id } = req.params
  let dataIndex = db.findIndex(record => record.id == id);
  if ( db[dataIndex]) {
    db[dataIndex].isActive = false;
    utils.save(db);
    res.send(db[dataIndex]);
  } else {
    next(new BadRequestException('record not found'));
  }
}