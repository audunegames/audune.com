const fs = require('fs');
const $ = require('jquery');

const {Router, NotFoundError} = require('./router.js');

// Import styles
require('@fortawesome/fontawesome-free/js/all.js');


// Event handler when the document is ready
$(function() {
  // Create the templates
  const templates = {
    // Normal pages
    'home': fs.readFileSync('src/templates/home.html', 'utf-8'),
    'games': fs.readFileSync('src/templates/games.html', 'utf-8'),
    'games/invisible-wings': fs.readFileSync('src/templates/games/invisible-wings.html', 'utf-8'),
    'games/wesley-smiths-repair-game': fs.readFileSync('src/templates/games/wesley-smiths-repair-game.html', 'utf-8'),
    'assets': fs.readFileSync('src/templates/assets.html', 'utf-8'),
    'contact': fs.readFileSync('src/templates/contact.html', 'utf-8'),
  };

  // Create the router
  const router = new Router('/', $('#view'));

  // Add routes to the router
  router.addRoute('home', {path: '/', template: templates['home']});
  router.addRoute('games', {path: '/games', template: templates['games']});
  router.addRoute('games/invisible-wings', {path: '/games/invisible-wings', template: templates['games/invisible-wings']});
  router.addRoute('games/wesley-smiths-repair-game', {path: '/games/wesley-smiths-repair-game', template: templates['games/wesley-smiths-repair-game']});
  router.addRoute('assets', {path: '/assets', template: templates['assets']});
  router.addRoute('contact', {path: '/contact', template: templates['contact']});

  // Add hooks to the router
  router.addAfterRoutingHook(afterRouting);
  router.addAfterRenderingHook(afterRendering);

  // Resolve the route
  router.resolve();
  console.log(router);


  // Hook for when the router is done routing
  function afterRouting() {
    // Scroll to the top of the page
    window.scrollTo({top: 0});
  }

  // Hook for when the router is done rendering
  function afterRendering($el) {
    // Resolve the email links
    $el.find("a[data-mailto]").on('mouseover touchstart', function() {
      const mailto = atob($(this).attr('data-mailto'));
      $(this).attr('href', `mailto:${mailto}`);
    });
  }


  // Check for click events on the navbar burger icon
  $(".navbar-burger").on('click', function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});
