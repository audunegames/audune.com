const $ = require('jquery');


// Event handler when the document is ready
$(function() {
   // Check for click events on the navbar burger icon
  $(".navbar-burger").on('click', function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Resolve the email links
  $el.find("a[data-mailto]").on('mouseover touchstart', function() {
    const mailto = atob($(this).attr('data-mailto'));
    $(this).attr('href', `mailto:${mailto}`);
  });
});