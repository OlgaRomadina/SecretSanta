const { Card } = require('../db/models');

const cards = await Card.FindAll();
cards.map((card, index, arrayCards) => {
  const randomCard = Math.round(-0.5 + Math.random(arrayCards.length + 1) * (1));
  if(arrayCards[randomCard].user_id !== card.user_id && arrayCards[randomCard].giver_id !==  )
});
