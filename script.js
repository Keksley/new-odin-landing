document.querySelectorAll('.select').forEach(el => new SlimSelect({
  select: el,
  settings: {
      showSearch: false,
      hideSelected: true,
  }
}));

MicroModal.init({
  disableScroll: true,
  onClose(modal) {
    if (modal.id === 'video-modal') {
      modal.querySelector('#player').contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    }
  }
});
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
          startButton.disabled = false;
          if (roleSelect.value ==='student') {
            document.querySelector('.connect__form').style.display = 'none';
          }
      }
  }
})
const form = document.getElementById('organization-form');
const startButton = document.getElementById('start');

startButton.addEventListener('click', () => {
  if (!roleSelect.value) {
      document.querySelector('.connect__select ').classList.add('invalid');
      return;
  }
  if (roleSelect.value === 'student') {
      window.location.href = 'https://xn----gtbmrddebg7h7a.xn--p1ai/';
  } else {
    if (isShowForm) {
      form.dispatchEvent(new SubmitEvent('submit'));
    } else {
      isShowForm = true;
      document.querySelector('.connect__form').style.display = 'flex';
      startButton.disabled = true;
      document.getElementById('agreement').addEventListener('change', (e) => {
        startButton.disabled = !e.target.checked;
    })

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

const showSuccessModal = () => { 
  MicroModal.show('success', {
    disableScroll: true,
  });
};

const showErrorModal = () => {
  MicroModal.show('error', {
    disableScroll: true,
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  startButton.disabled = true;
  const body = JSON.stringify([...new FormData(e.target).entries()].reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {}));
  const url = e.target.action;
  const method = 'POST';
  fetch(url, {
    method,
    body,  
  }).then(e => {
    if (e.status === 200) {
      showSuccessModal();
    } else {
      showErrorModal();
    }
  }).catch(showErrorModal).finally(() => {
    startButton.disabled = false;
  })
  
});