const createCardForm = document.querySelector('.js-create-card');
const card = document.querySelector('.card');
const cardDescription = document.querySelector('.cardDescription');
const cardLocation = document.querySelector('.cardLocation');
const delBtn = document.querySelector('.delBtn');

createCardForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { method, action } = event.target;
  const response = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      about: event.target.aboutInput.value,
      location: event.target.locationInput.value,
    }),
  });

  const data = await response.json();

  cardDescription.innerHTML = data.about;
  cardLocation.innerHTML = data.location;
  card.style.display = 'block';
});

delBtn?.addEventListener('click', async (event) => {
  event.preventDefault();
  const response = await fetch('/lk', {
    method: 'DELETE',
  });
  const data = await response.json();

  cardDescription.innerHTML = '';
  cardLocation.innerHTML = '';
  card.style.display = 'none';
});
