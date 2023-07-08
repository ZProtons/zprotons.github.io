$(document).ready(function() {
  $('#order-form').submit(function(event) {
    event.preventDefault();

    // Reset error messages
    $('#url-error').addClass('d-none');
    $('#phone-error').addClass('d-none');
    $('#address-error').addClass('d-none');

    // Get form values
    var productUrl = $('#product-url').val();
    var phoneNumber = $('#contact-phone').val();
    var quantity = $('#quantity').val();
    var shippingAddress = $('#shipping-address').val();

    // Check if URL is valid
    if (!isValidUrl(productUrl)) {
      $('#url-error').removeClass('d-none');
      return;
    }

    // Check if phone number is valid
    if (!isValidPhoneNumber(phoneNumber)) {
      $('#phone-error').removeClass('d-none');
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
    console.log('Contact Phone Number:', phoneNumber);
    console.log('Quantity:', quantity);
    console.log('Shipping Address:', shippingAddress);

    // Extract metadata and display product image
    extractMetadata(productUrl)
      .then(function(metadata) {
        // Display product image
        if (metadata.image) {
          $('#product-image').attr('src', metadata.image);
          $('#product-preview').removeClass('d-none');
        }
      })
      .catch(function(error) {
        console.error('Error extracting metadata:', error);
      });

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

  // Function to validate phone number
  function isValidPhoneNumber(phoneNumber) {
    // Add your phone number validation logic here
    // This is just a placeholder
    return phoneNumber.trim() !== '';
  }

  // Function to validate address
  function isValidAddress(address) {
    // Add your address validation logic here
    // This is just a placeholder
    return address.trim() !== '';
  }

  // Function to extract metadata from URL
  function extractMetadata(url) {
    return new Promise(function(resolve, reject) {
      var image = new Image();

      image.onload = function() {
        resolve({
          image: url,
        });
      };

      image.onerror = function() {
        reject(new Error('Failed to load image'));
      };

      image.src = url;
    });
  }
});
