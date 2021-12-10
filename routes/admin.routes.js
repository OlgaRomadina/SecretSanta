const router = require('express').Router();
const { Card } = require('../db/models');

router.get('/', async (req, res) => {
  if (req.session.isAdmin) {
    const cards = await Card.findAll({
      raw: true,
    });
    // console.log(cards);
    res.render('adminLk', {
      isUser: req.session.user_id,
      cards,
    });
  } else {
    res.redirect('/');
  }
});

router.delete('/', async (req, res) => {
  const { cardId } = req.body;
  // console.log(req.body.cardId);
  // console.log('lala');
  try {
    await Card.destroy({ where: { id: cardId } }); // TODO: удаляет все карточки с user_id 1
    res.json({ isDeleted: 'deleted!' });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
