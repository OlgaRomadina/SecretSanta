// console.log(document.regForm);
const regSubmit = document.regForm;

regSubmit.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {
    login,
    email,
    password1,
    password2,

  } = event.target;

  if (password1.value !== password2.value) {
    alert('Пароли не совпадают');
    return;
  }
  if (!login || !email || !password1.value || !password2.value) {
    alert('Заполни все поля, братишка');
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
  if (result.thisUser) {
    alert(result.message);
  } else {
    alert(result.message);
  }

  console.log(event.target.action);
});
