const regSubmit = document.regForm;
const alertDivReg = document.querySelector('.alertReg');
const alertMsgReg = document.querySelector('.alertMsgReg');
const closeBtnReg = document.querySelector('.closeBtnReg');

regSubmit?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const {
    login, email, password1, password2,
  } = event.target;
  if (password1.value !== password2.value) {
    alertMsgReg.innerHTML = 'Пароли не совпадают';
    alertDivReg.style.display = 'block';
    return;
  }
  const response = await fetch('/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: login.value,
      email: email.value,
      password: password1.value,
    }),
  });

  const result = await response.json();
  if (result.isUser) {
    alertMsgReg.innerHTML = result.message;
    alertDivReg.style.display = 'block';
  } else {
    alertMsgReg.innerHTML = result.message;
    alertDivReg.style.display = 'block';
  }
});

closeBtnReg?.addEventListener('click', () => {
  alertDivReg.style.display = 'none';
  window.location.href = '/lk';
});
