const router = require('express').Router();
const { Card } = require('../db/models');
const draw = require('../helper/randomizer');

router.put('/', async (req, res) => {
  const cards = await Card.findAll();
  const givers = draw(cards);
  try {
    for (let i = 0; i < cards.length; i += 1) {
      await cards[i].update({ giver_id: givers[i].user_id });
    }
    res.json({ successful: true });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
