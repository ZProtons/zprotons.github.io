// Add your custom JavaScript code here
document.addEventListener('DOMContentLoaded', function () {
  new Glide('.slider', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay: 3000,
    hoverpause: true,
  }).mount();

  $('.thumbnail-item').on('click', function () {
    $('.thumbnail-item').removeClass('active');
    $(this).addClass('active');
    var index = $(this).index();
    $('.glide').data('glide_api').go(`=${index}`);
  });
});
