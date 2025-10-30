(function () {
  const root = document.documentElement;
  const langButtons = document.querySelectorAll('.lang-btn');
  const toggleElements = document.querySelectorAll('[data-lang]');
  const placeholders = document.querySelectorAll('[data-placeholder-en]');
  const optionElements = document.querySelectorAll('option[data-text-en]');
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  const yearField = document.getElementById('year');

  const storedLanguage = localStorage.getItem('aopa-language');
  const browserLanguage = navigator.language?.startsWith('bg') ? 'bg' : 'en';
  const defaultLanguage = storedLanguage || browserLanguage || 'bg';

  function setLanguage(lang) {
    root.setAttribute('lang', lang);
    root.classList.toggle('lang-en', lang === 'en');
    root.classList.toggle('lang-bg', lang === 'bg');
    localStorage.setItem('aopa-language', lang);

    toggleElements.forEach((el) => {
      el.hidden = el.dataset.lang !== lang;
    });

    placeholders.forEach((field) => {
      const nextPlaceholder = field.dataset[`placeholder${lang === 'en' ? 'En' : 'Bg'}`];
      if (nextPlaceholder) {
        field.setAttribute('placeholder', nextPlaceholder);
      }
    });

    optionElements.forEach((option) => {
      option.textContent = lang === 'en' ? option.dataset.textEn : option.dataset.textBg;
    });

    langButtons.forEach((button) => {
      const isActive = button.dataset.language === lang;
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  setLanguage(defaultLanguage);

  langButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextLang = button.dataset.language;
      if (nextLang) {
        setLanguage(nextLang);
      }
    });
  });

  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      navigation.classList.toggle('open', !expanded);
    });

    navigation.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('open');
      }
    });
  }

  if (yearField) {
    yearField.textContent = new Date().getFullYear();
  }
})();
