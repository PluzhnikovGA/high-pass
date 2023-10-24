ymaps.ready(init);
function init() {
  myMap = new ymaps.Map('myMap', {
    center: [55.760547, 37.615353],
    zoom: 13,
    controls: [],
  });

  myMap.behaviors.disable(['drag', 'rightMouseButtonMagnifier', 'scrollZoom'])

  var myPlacemark = new ymaps.Placemark([55.769377, 37.639072], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/placemarker.svg',
    iconImageSize: [12, 12],
    iconImageOffset: [-6, -6],
  });

  myMap.geoObjects.add(myPlacemark);
}
