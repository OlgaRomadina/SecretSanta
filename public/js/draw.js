const redButton = document.querySelector('.redButton');

redButton.addEventListener('click', async (event) => {
  const response = await fetch('/draw', { method: 'put'}, );
  const gotDrow = await response.json();
})
