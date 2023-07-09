$(document).ready(function() {
  $('#order-form').submit(function(event) {
    event.preventDefault();

    // Reset error messages
    $('#url-error').addClass('hidden');
    $('#address-error').addClass('hidden');

    // Get form values
    var productUrl = $('#product-url').val();
    var quantity = $('#quantity').val();
    var shippingAddress = $('#shipping-address').val();
    var contactNumber = $('#contact-number').val();

    // Check if URL is valid
    if (!isValidUrl(productUrl)) {
      $('#url-error').removeClass('hidden');
      return;
    }

    // Check if address is valid
    if (!isValidAddress(shippingAddress)) {
      $('#address-error').removeClass('hidden');
      return;
    }

    // Perform any necessary operations with the form values (e.g., validation, data processing, etc.)

    // Example: Log the form values to the console
    console.log('Product URL:', productUrl);
    console.log('Quantity:', quantity);
    console.log('Shipping Address:', shippingAddress);
    console.log('Contact Phone Number:', contactNumber);

    // Simulating a successful order placement
    // You can replace this with your own logic to submit the order to the server
    setTimeout(function() {
      // Hide the form and show the success message
      $('#order-form').addClass('hidden');
      $('#order-success').removeClass('hidden');
    }, 2000);

    // Send email using EmailJS
    sendEmail(productUrl, quantity, shippingAddress, contactNumber);
  });

  // Back button click event
  $('#back-button').click(function() {
    $('#order-success').addClass('hidden');
    $('#order-form').removeClass('hidden');
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

  // Function to send email using EmailJS
  function sendEmail(productUrl, quantity, shippingAddress, contactNumber) {
    // Replace with your EmailJS service ID
    var serviceID = 'service_zfyiv3s';

    // Replace with your EmailJS template ID
    var templateID = 'YOUR_TEMPLATE_ID';

    // Replace with your EmailJS user ID
    var userID = 'htjxVsAaMrvwi03_x';

    // Prepare the email template parameters
    var templateParams = {
      productUrl: productUrl,
      quantity: quantity,
      shippingAddress: shippingAddress,
      contactNumber: contactNumber
    };

    // Send the email using EmailJS
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then(function(response) {
        console.log('Email sent successfully:', response.status, response.text);
      }, function(error) {
        console.error('Failed to send email:', error);
      });
  }
});
