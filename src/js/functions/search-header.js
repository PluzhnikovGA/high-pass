(function(){
  const searchText = document.querySelector('.search__input');

  searchText.addEventListener('click', function(activate_searchText) {
    activate_searchText._isClick = true;
    searchText.classList.add("search__input--active");
    searchText.classList.add("search__input--active::placeholder");
  });

  searchText.addEventListener('keydown', function(activate_searchText) {
    var tabKey = ['Tab', 'Enter', 'Escape']
    if (tabKey.includes(activate_searchText.key)) {
      searchText.classList.remove("search__input--active");
      searchText.classList.remove("search__input--active::placeholder");
      document.querySelector('.search--active').classList.remove('search--active');
    };
  });

  document.body.addEventListener('click', function(activate_searchText) {
    if (activate_searchText._isClick == true) return
    searchText.classList.remove("search__input--active");
    searchText.classList.remove("search__input--active::placeholder");
  });
})();
