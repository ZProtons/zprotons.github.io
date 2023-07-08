$(document).ready(function() {
  $('#order-form').submit(function(event) {
    event.preventDefault();

    // Reset error messages
    $('#url-error').addClass('d-none');
    $('#address-error').addClass('d-none');

    // Get form values
    var productUrl = $('#product-url').val();
    var quantity = $('#quantity').val();
    var shippingAddress = $('#shipping-address').val();
    var contactPhone = $('#contact-phone').val();

    // Check if URL is valid
    if (!isValidUrl(productUrl)) {
      $('#url-error').removeClass('d-none');
      return;
    }

    // Check if address is valid
    if (!isValidAddress(shippingAddress)) {
      $('#address-error').removeClass('d-none');
      return;
    }

    // Perform any necessary operations with the form values (e.g., validation, data processing, etc.)

    // Example: Log the form values to the console
    console.log('Product URL:', productUrl);
    console.log('Quantity:', quantity);
    console.log('Shipping Address:', shippingAddress);
    console.log('Contact Phone Number:', contactPhone);

    // Simulating a successful order placement
    // You can replace this with your own logic to submit the order to the server
    setTimeout(function() {
      // Hide the form and show the success message
      $('#order-form').addClass('d-none');
      $('#order-success').removeClass('d-none');
    }, 2000);
  });

  // Back button click event
  $('#back-button').click(function() {
    $('#order-success').addClass('d-none');
    $('#order-form').removeClass('d-none');
  });

  // Function to validate URL
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Function to validate address
  function isValidAddress(address) {
    // Add your address validation logic here
    // This is just a placeholder
    return address.trim() !== '';
  }

  // Function to extract product image from URL
  function extractProductImage(url) {
    axios.get('https://sultankosen.pythonanywhere.com/scrape?url=' + encodeURIComponent(url))
      .then(function(response) {
        var image = response.data.image;

        // Display the product image
        $('.image-preview').css('background-image', 'url(' + image + ')');
      })
      .catch(function(error) {
        console.log('Error fetching URL:', error);
      });
  }

  // Listen for changes in the product URL field
  $('#product-url').on('input', function() {
    var url = $(this).val();
    if (isValidUrl(url)) {
      extractProductImage(url);
    } else {
      $('.image-preview').css('background-image', 'none');
    }
  });
});
