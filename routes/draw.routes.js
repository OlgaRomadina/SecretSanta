const router = require('express').Router();
const { Card } = require('../db/models');
const draw = require('../helper/randomizer');

router.put('/', async (req, res) => {
  
  const cards = await Card.findAll({ raw: true });
  const givers = draw(cards);
  console.log(givers)
  cards.map(async (card, index) => {
    await card.update({ giver_id: givers[index] });
  });
  // for (let i = 0; i < cards.length; i += 1) {
  //   cards[i].update({ giver_id: givers[i] });
  // }
  res.json({ successful : true });
});

module.exports = router;
