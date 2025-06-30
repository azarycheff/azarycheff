document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const emailInput = document.getElementById('azlab2_email');
  const phoneInput = document.getElementById('azlab2_phone');
  const agreeCheckbox = document.getElementById('azlab2_agree');
  const adsCheckbox = document.getElementById('azlab2_ads');
  const modal = new bootstrap.Modal(document.getElementById('resultModal'));
  const modalMessage = document.getElementById('modalMessage');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const agree = agreeCheckbox.checked;
    const ads = adsCheckbox.checked;

    // ггггг
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,11}$/; // 11 цифр

    let errors = [];

    // Проверка email
    if (!email) {
      errors.push('Введите email.');
    } else if (!emailRegex.test(email)) {
      errors.push('Введите корректный email.');
    }

    // Проверка телефона
    if (!phone) {
      errors.push('Введите телефон.');
    } else if (!phoneRegex.test(phone)) {
      errors.push('Телефон должен содержать от 10 до 11 цифр (можно с "+").');
    }

    if (!agree) {
      errors.push('Вы должны согласиться на обработку личных данных.');
    }

    if (errors.length > 0) {
      modalMessage.innerHTML = '<div class="text-danger">' + errors.join('<br>') + '</div>';
      modal.show();
      return;
    }

    console.log('Данные формы:');
    console.log('Email:', email);
    console.log('Телефон:', phone);
    console.log('Согласен на обработку данных:', agree);
    console.log('Согласен на рассылку:', ads);

    modalMessage.innerHTML = '<div class="text-success">Данные успешно обработаны и отправлены!</div>';
    modal.show();
  });
});
