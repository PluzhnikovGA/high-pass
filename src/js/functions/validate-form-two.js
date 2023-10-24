// validate firs form

const validationTwo = new JustValidate('.right__form', {
  errorFieldCssClass: 'is-invalid-registretion',
  errorLabelStyle: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: '400',
    fontSize: '9px',
    lineHeight: "11px",
    color: '#ff3030',
  },

  errorLabelCssClass: 'error-registretion',
  successFieldCssClass: 'is-valid',
  focusInvalidField: true,
  lockForm: true,
});

validationTwo
.addField('.text-name', [
  {
    rule: "required",
    value: true,
    errorMessage: "Введите Имя",
  },
  {
    rule: 'customRegexp',
    value: /^[a-zа-яё]+$/gi,
    errorMessage: "Недопустимый формат",
  },
])
.addField('.text-email', [
  {
    rule: "required",
    value: true,
    errorMessage: "Введите Email",
  },
  {
    rule: "email",
    value: true,
    errorMessage: "Недопустимый формат",
  },
])

// validationTwo.onSuccess((ev) => {
//   let formData = new FormData(ev.target);

//   let xhr = new XMLHttpRequest();

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         if (afterSend) {
//           afterSend();
//         }
//         console.log('Отправлено');
//       }
//     }
//   }

//   xhr.open('POST', 'mail.php', true);
//   xhr.send(formData);

//   ev.target.reset();
// });

