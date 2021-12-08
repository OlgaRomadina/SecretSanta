document.login.addEventListener('submit', async (event) => {
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
    return alert('Пользователь с таким email не найден');
  }
  if (!responseJson.isCorrectPassword) {
    return alert('Неправильный пароль');
  }
  return alert(`Добро пожаловать, ${responseJson.name}`);
});
