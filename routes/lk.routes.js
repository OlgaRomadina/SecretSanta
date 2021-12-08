const router = require('express').Router();
const { Card } = require('../db/models');

router.get('/', (req, res) => {
  res.render('lk');
});

router.post('/', async (req, res) => {
  const { about, location } = req.body;
  await Card.create({
    about,
    location,
    user_id: '1', // TODO: сейчас присваивает всегда id 1
  });
  res.json({
    about,
    location,
  });
});

router.delete('/', async (req, res) => {
  try {
    await Card.destroy({ where: { user_id: 1 } }); // TODO: удаляет все карточки с user_id 1
    res.json({ isDeleted: 'deleted!' });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put('/', async (req, res) => {
  const { about, location } = req.body;
  try {
    await Card.update({ about, location }, { where: { user_id: 1 } }); // TODO: изменяет все карточки с user_id 1
    res.json({
      about,
      location,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
