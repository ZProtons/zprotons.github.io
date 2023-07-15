$(document).ready(function() {
  // Search functionality
  $('.search-input').on('input', function() {
    var searchText = $(this).val().toLowerCase();
    $('.website-item').each(function() {
      var websiteName = $(this).find('h3').text().toLowerCase();
      if (websiteName.indexOf(searchText) > -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
