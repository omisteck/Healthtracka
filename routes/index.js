var express = require('express');
const { check } = require('express-validator');
const IpLocationController = require('../controllers/IPLocation.controller');
var router = express.Router();

/* create endpoint. */
router.post(
  '/location/verify',
  check('domain').isURL().withMessage('invalid url'), // validate domain
  IpLocationController.verify
);


/* create endpoint. */
router.get(
  '/location',
  IpLocationController.getAll
);

/* show endpoint. */
router.get(
  '/location/:id',
  check('id').exists().isInt().withMessage("enter a valid id"), // validate domain
  IpLocationController.show
);


/* show endpoint. */
router.patch(
  '/location/:id',
  check('id').exists().isInt().withMessage("enter a valid id"), // validate domain
  IpLocationController.update
);

/* delete endpoint. */
router.delete(
  '/location/:id',
  check('id').exists().isInt().withMessage("enter a valid id"), // validate domain
  IpLocationController.delete
);



module.exports = router;
