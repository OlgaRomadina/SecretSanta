const redButton = document.querySelector('.redButton');

const alertDivLkA = document.querySelector('.alertLkA');
const alertMsgLkA = document.querySelector('.alertMsgLkA');
const closeBtnLkA = document.querySelector('.closeBtnLkA');

redButton?.addEventListener('click', async () => {
  await fetch('/draw', { method: 'put' });
  alertMsgLkA.innerHTML = 'Шалость удалась!';
  alertDivLkA.style.display = 'block';
});
