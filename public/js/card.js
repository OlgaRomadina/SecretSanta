const createCardForm = document.querySelector('.js-create-card');
const card = document.querySelector('.card');
const cardDescription = document.querySelector('.cardDescription');
const cardLocation = document.querySelector('.cardLocation');
const delBtn = document.querySelector('.delBtn');
const updBtn = document.querySelector('.updBtn');
const editForm = document.querySelector('.editForm');
const editCard = document.querySelector('.editCard');

const changeBg = document.querySelector('.change-bg');
const changeBg2 = document.querySelector('.change-bg2');
const logo = document.querySelector('.logo');
const grinch = document.querySelector('.grinch');

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
  updBtn.style.display = 'block';
  createCardForm.style.display = 'none';
});

delBtn?.addEventListener('click', async (event) => {
  event.preventDefault();
  await fetch('/lk', {
    method: 'DELETE',
  });

  cardDescription.innerHTML = '';
  cardLocation.innerHTML = '';
  createCardForm.style.display = 'block';
  card.style.display = 'none';
  editCard.style.display = 'none';
});

updBtn?.addEventListener('click', async (event) => {
  event.preventDefault();
  editCard.style.display = 'block';
  updBtn.style.display = 'none';
  card.style.display = 'none';
});

editForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { action } = event.target;
  const response = await fetch(action, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      about: event.target.editAboutInput.value,
      location: event.target.editLocInput.value,
    }),
  });

  const data = await response.json();

  cardDescription.innerHTML = data.about;
  cardLocation.innerHTML = data.location;
  editCard.style.display = 'none';
  updBtn.style.display = 'block';
  card.style.display = 'block';
});

changeBg.addEventListener('click', () => {
  logo.style.display = 'none';
  grinch.style.display = 'block';
  changeBg.style.display = 'none';
  changeBg2.style.display = 'block';
});

changeBg2.addEventListener('click', () => {
  logo.style.display = 'block';
  grinch.style.display = 'none';
  changeBg.style.display = 'block';
  changeBg2.style.display = 'none';
});
