const router = require('express').Router();
const { Card } = require('../db/models');

router.get('/', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect('/');
  } else {
    const cardGiver = await Card.findOne({
      where: { giver_id: req.session.user_id },
    });
    const card = await Card.findOne({
      where: { user_id: req.session.user_id },
    });
    res.render('lk', {
      title: 'Cabinet',
      isUser: req.session.user_id,
      card,
      cardGiver,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { about, location } = req.body;
    await Card.create({
      about,
      location,
      user_id: req.session.user_id,
    });
    res.json({
      about,
      location,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

router.delete('/', async (req, res) => {
  try {
    await Card.destroy({ where: { user_id: req.session.user_id } });
    res.json({ isDeleted: 'deleted!' });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put('/', async (req, res) => {
  const { about, location } = req.body;
  try {
    await Card.update(
      { about, location },
      { where: { user_id: req.session.user_id } },
    );
    res.json({
      about,
      location,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
