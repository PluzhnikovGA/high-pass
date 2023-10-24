// validate firs form

const validationOne = new JustValidate('#about-us__form', {
  errorFieldCssClass: 'is-invalid-subscription',
  errorLabelStyle: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: '400',
    fontSize: '9px',
    lineHeight: "11px",
    color: '#f06666',
  },

  errorLabelCssClass: 'error-subscription',
  successFieldCssClass: 'is-valid',
  focusInvalidField: true,
  lockForm: true,
});

validationOne
.addField('.subscription-request', [
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

// validationOne.onSuccess((ev) => {
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

