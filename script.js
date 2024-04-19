document.querySelectorAll('.select').forEach(el => new SlimSelect({
  select: el,
  settings: {
      showSearch: false,
      hideSelected: true,
  }
}));

// document.querySelectorAll('.ui-select').forEach(el => new SlimSelect({
//     select: el,
//     settings: {
//         showSearch: false,
//         placeholderText: 'Ваша роль',
//     }
// }));
document.getElementById('chose-role').addEventListener('click', () => {
  document.querySelector('.connect__content--role').style.display = 'flex';
  document.querySelector('.connect__content:not(.connect__content--role)').style.display = 'none';
});
const roleSelect = document.getElementById('role-select');
let isShowForm = false;
new SlimSelect({
  select: roleSelect,
  settings: {
      showSearch: false,
      placeholderText: 'Ваша роль',
  },
  events: {
      afterChange() {
          document.querySelector('.connect__select').classList.remove('invalid');
          isShowForm = false;
          if (roleSelect.value ==='student') {
            document.querySelector('.connect__form').style.display = 'none';
          }
      }
  }
})
document.getElementById('start').addEventListener('click', () => {
  if (!roleSelect.value) {
      document.querySelector('.connect__select ').classList.add('invalid');
      return;
  }
  if (roleSelect.value === 'student') {
      window.location.href = 'https://xn----gtbmrddebg7h7a.xn--p1ai/';
  } else {
    if (isShowForm) {
      // Тут отправляем заявку на сервак
    } else {
      isShowForm = true;
      document.querySelector('.connect__form').style.display = 'flex';
    }
  }
});
var im = new Inputmask("+7 (999) 999 - 99 - 99");
im.mask(document.querySelector('#phone'));

document.querySelectorAll('.accordeon__label').forEach(el => {
  el.addEventListener('click', () => handleAccordeonClick(el))
});
function handleAccordeonClick(el) {
  const content = el.nextElementSibling;
  el.classList.toggle("active"); // присваиваем ему активный класс
  if (el.classList.contains("active")) {
      content.style.maxHeight = content.scrollHeight + "px";
  } else {
      content.style.maxHeight = 0;
  }
}

document.querySelectorAll('[connect]').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelector('.connect').scrollIntoView({
      behavior:'smooth',
      block: 'start',
    });
  })
})