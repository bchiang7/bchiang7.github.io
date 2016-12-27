$(function() {
  const contentSections = $('.section');
  const navigationItems = $('#dot-nav a');
  const overlayItems = $('#overlay a');

  // ==================== VERTICAL NAV ON SCROLL ==================== //

  updateNavigation();

  $(window).on('scroll', function() {
    updateNavigation();
  });

  //smooth scroll to the section
  navigationItems.on('click', function(event) {
    event.preventDefault();
    smoothScroll($(this.hash));
  });

  overlayItems.on('click', function(event) {
    event.preventDefault();
    smoothScroll($(this.hash));
    $('#toggle').click();
  });

  // smooth scroll to second section
  $('.scroll-down').on('click', function(event) {
    event.preventDefault();
    smoothScroll($(this.hash));
  });

  // close navigation on touch devices when selectinG an elemnt from the list
  $('.touch #dot-nav a').on('click', function() {
    $('.touch #dot-nav').removeClass('open');
  });


  function updateNavigation() {
    contentSections.each(function() {
      const $this = $(this);
      const activeSection = $('#dot-nav a[href="#' + $this.attr('id') + '"]').data('number') - 1;

      if (($this.offset().top - $(window).height() / 2 < $(window).scrollTop()) && ($this.offset().top + $this.height() - $(window).height() / 2 > $(window).scrollTop())) {
        navigationItems.eq(activeSection).addClass('is-selected');
      } else {
        navigationItems.eq(activeSection).removeClass('is-selected');
      }
    });
  }

  function smoothScroll(target) {
    $('body,html').animate({ 'scrollTop': target.offset().top + 50 }, 600);
  }

});


// hide dot nav if we are on the intro section
const dotNav = document.querySelector('#dot-nav');
const about = document.querySelector('#about-section');

function handleDotNav() {
  const isDesktop = window.innerWidth > 768;
  const topOfAbout = about.offsetTop - (about.offsetTop / 4);
  const isBelowIntro = window.scrollY > topOfAbout;

  if (isDesktop && isBelowIntro) {
    dotNav.classList.add('active');
  } else {
    dotNav.classList.remove('active');
  }
}

window.addEventListener('scroll', handleDotNav);


// hide or show hamburger menu depending on window width
const hamburger = document.querySelector('#toggle');
const overlay = document.querySelector('#overlay');

function switchNavs() {
  const isDesktop = window.innerWidth > 768;
  const menuOpen = overlay.classList.contains('open');

  if (isDesktop) {
    dotNav.classList.add('active');
    if (menuOpen) {
      hamburger.classList.remove('active');
      overlay.classList.remove('open');
    }
  } else {
    dotNav.classList.remove('active');
  }
}

window.addEventListener('resize', switchNavs);


// Toggle mobile menu open and closed
function toggleMenu() {
  this.classList.toggle('active');
  overlay.classList.toggle('open');
  document.body.classList.toggle('noScroll');
}

hamburger.addEventListener('click', toggleMenu);


const isMobile = {
  Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

// turn off parallax effect on mobile devices
if (!isMobile.any()) {
  skrollr.init({
    render: function(data) {
      //Debugging - Log the current scroll position.
      // console.log(data.curTop);
    },
    smoothScrolling: false,
    forceHeight: false
  });
}


// toggle contact input classes on focus or blur
const contactInput = document.querySelectorAll('.contact-input');

function focusInput() {
  this.parentElement.classList.add('is-active', 'is-completed');
}
function blurInput() {
  this.parentElement.classList.remove('is-active', 'is-completed');
}

contactInput.forEach(input => input.addEventListener('focus', focusInput));
contactInput.forEach(input => input.addEventListener('blur', blurInput));


// dynamically expand textarea
const textarea = document.querySelector('#message');
const limit = 300;

function autoExpand() {
  textarea.style.height = "";
  textarea.style.height = `${Math.min(textarea.scrollHeight, limit)}px`;
};

textarea.addEventListener('input', autoExpand);
