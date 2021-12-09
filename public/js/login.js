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
    alertMsg.innerHTML = 'Пользователь с таким email не найден';
    alertDiv.style.display = 'block';
    return;
  }
  if (!responseJson.isCorrectPassword) {
    alertMsg.innerHTML = 'Неправильный пароль';
    alertDiv.style.display = 'block';
    return;
  }
  window.location.href = '/lk';
});

closeBtn?.addEventListener('click', () => {
  alertDiv.style.display = 'none';
});
