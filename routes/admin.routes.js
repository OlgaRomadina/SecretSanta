const router = require('express').Router();
const { Card } = require('../db/models');

router.get('/', async (req, res) => {
const cards = await Card.findAll({
  raw: true
})
console.log(cards);
  res.render('adminLk', {
    cards: cards
  })
}) 

module.exports = router;

