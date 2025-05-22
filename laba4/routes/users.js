var express = require('express');
const authJwt = require('../middleware/authjwt');
const db = require('../db/db');
var router = express.Router();

/* GET users listing. */
router.get('/profile', [authJwt.verifyToken],function(req, res, next) {
  res.send('respond with a resource');
});
//[authJwt.verifyToken, authJwt.isUser]
router.get('/items',  async (req, res) => {
  const items = db.getItems()
  if (user === null) throw `Couldn't get items.`

  res.send({
    id: items.id,
    name: items.name,
    status: items.status,
    errors: items.errors
  })
})

module.exports = router;
