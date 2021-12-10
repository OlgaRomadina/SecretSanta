const admDelBtn = document.querySelector('.admDelBtn');
const admUpdBtn = document.querySelector('.admUpdBtn');

admDelBtn?.addEventListener('click', async (event) => {
  event.preventDefault();
  const cardId =  event.target.id
  await fetch('/adminLk', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cardId: cardId,
    }),
  });

  console.log(event.target);
  // cardDescription.innerHTML = '';
  // cardLocation.innerHTML = '';
  // createCardForm.style.display = 'block';
  // card.style.display = 'none';
  // editCard.style.display = 'none';
});
