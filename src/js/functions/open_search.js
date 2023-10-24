(function(){
  const btnOpenSearch = document.querySelector('.search__btn');
  const search = document.querySelector('.header__search');

  btnOpenSearch.addEventListener('click', () => {
    search.classList.toggle('search--active');
  });
})();
