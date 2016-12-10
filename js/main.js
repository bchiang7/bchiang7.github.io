$(function() {
  var contentSections = $('.section'),
  navigationItems = $('#dot-nav a'),
  overlayItems = $('#overlay a');
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

  // ==================== VERTICAL NAV ON SCROLL ==================== //
  $(document).scroll(function() {
    var x = $(window).width();
    var y = $(this).scrollTop();
    var $nav = $('#dot-nav');
    if (x > 768 && y > 500) {
      $nav.fadeIn();
    } else {
      $nav.fadeOut();
    }
  });

  function updateNavigation() {
    contentSections.each(function() {
      var $this = $(this);
      var activeSection = $('#dot-nav a[href="#' + $this.attr('id') + '"]').data('number') - 1;
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

  // ==================== MOBILE MENU ==================== //
  $('#toggle').click(function(e) {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
    $('body').toggleClass('noScroll');
  });
  $(window).on('resize', function(event) {
    var windowWidth = $(window).width();
    var isOpen = $('#overlay').hasClass('open');

    if (windowWidth > 768) {
      $('#dot-nav').show();
      if (isOpen) {
        $('#toggle').removeClass('active');
        $('#overlay').removeClass('open');
      }
    } else if (windowWidth < 768) {
      $('#dot-nav').hide();
    }
  });

  // ==================== CONTACT FORM ==================== //
  var $contactInput = $('.contact-input');
  $contactInput.focus(function() {
    $(this).parent().addClass('is-active is-completed');
  });
  $contactInput.focusout(function() {
    if ($(this).val() === "") {
      $(this).parent().removeClass('is-completed');
    }
    $(this).parent().removeClass('is-active');
  });

  $(document).one('focus.textarea', '.autoExpand', function() {
    var savedValue = this.value;
    this.value = '';
    this.baseScrollHeight = this.scrollHeight;
    this.value = savedValue;
  })
  .on('input.textarea', '.autoExpand', function() {
    var minRows = this.getAttribute('data-min-rows') | 0,
    rows;
    this.rows = minRows;
    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
    this.rows = minRows + rows;
  });

  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

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

});
