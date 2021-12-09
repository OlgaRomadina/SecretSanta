const alertDiv = document.querySelector('.alert');
const alertMsg = document.querySelector('.alertMsg');
const closeBtn = document.querySelector('.closeBtn');

document.login?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { email, password } = document.login;
  const response = await fetch('/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  const responseJson = await response.json();
  if (!responseJson.isUser) {
    alertMsgReg.innerHTML = 'Пользователь с таким email не найден';
    alertDivReg.style.display = 'block';
    return;
  }
  if (!responseJson.isCorrectPassword) {
    alertMsgReg.innerHTML = 'Неправильный пароль';
    alertDivReg.style.display = 'block';
    return;
  }
  window.location.href = '/lk';
});

closeBtnReg?.addEventListener('click', () => {
  alertDivReg.style.display = 'none';
});
