function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function draw(cards) {
  const givers = [...cards];
  shuffle(givers);

  const shuffledGivers = givers
    .map((giver, index, array) => ((giver.user_id == cards[index].user_id)
      ? ([giver, array[index + 1]] = [array[index + 1], giver])
      : giver));
    
      return shuffledGivers;

  // cards.map((card, index) => card.giver_id = shuffledGivers[index].user_id);
}

module.exports = draw;
