(function(){
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__burger-menu');
  const menuLinks = menu.querySelectorAll('.nav__link');
  const phoneLink = menu.querySelector('.header__phone');
  const exitmenu = document.querySelector('.header__exit');

  burger.addEventListener('click', () => {
    burger.classList.add('burger--active');
    menu.classList.add('burger-menu--active');
    document.body.classList.add('overflow--hidden');
  });

  menuLinks.forEach((el) => {
    el.addEventListener('click', function(){
      burger.classList.remove('burger--active')
      menu.classList.remove('burger-menu--active')
      document.body.classList.remove('overflow--hidden')
    });
  });

  phoneLink.addEventListener('click', function() {
    burger.classList.remove('burger--active');
    menu.classList.remove('burger-menu--active');
    document.body.classList.remove('overflow--hidden');
  });

  exitmenu.addEventListener('click', function() {
    burger.classList.remove('burger--active');
    menu.classList.remove('burger-menu--active');
    document.body.classList.remove('overflow--hidden');
  });
})();
