$(function() {
  const contentSections = $('.section');
  const navigationItems = $('#dot-nav a');
  const overlayItems = $('#overlay a');

  $(window).on('scroll', () => {  updateNavigation(); });
  //smooth scroll to the section
  navigationItems.on('click', event => {
    event.preventDefault();
    smoothScroll($(this.hash));
  });
  overlayItems.on('click', event => {
    event.preventDefault();
    smoothScroll($(this.hash));
    $('#toggle').click();
  });
  // smooth scroll to second section
  $('.scroll-down').on('click', event => {
    event.preventDefault();
    smoothScroll($(this.hash));
  });
  // close navigation on touch devices when selectinG an elemnt from the list
  $('.touch #dot-nav a').on('click', () => {
    $('.touch #dot-nav').removeClass('open');
  });

  // ==================== VERTICAL NAV ON SCROLL ==================== //
  $(document).scroll( () => {
    const x = $(window).width();
    const y = $(this).scrollTop();
    const $nav = $('#dot-nav');
    if (x > 768 && y > 500) {
      $nav.fadeIn();
    } else {
      $nav.fadeOut();
    }
  });

  function updateNavigation() {
    contentSections.each( () => {
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

  // ==================== MOBILE MENU ==================== //
  $('#toggle').click(function(e) {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
    $('body').toggleClass('noScroll');
  });
  $(window).on('resize', event => {
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
  const $contactInput = $('.contact-input');
  $contactInput.focus(function() {
    $(this).parent().addClass('is-active is-completed');
  });
  $contactInput.focusout(function() {
    if ($(this).val() === "") {
      $(this).parent().removeClass('is-completed');
    }
    $(this).parent().removeClass('is-active');
  });

  $(document).one('focus.textarea', '.autoExpand', () => {
    const savedValue = this.value;
    this.value = '';
    this.baseScrollHeight = this.scrollHeight;
    this.value = savedValue;
  }).on('input.textarea', '.autoExpand', () => {
    var minRows = this.getAttribute('data-min-rows') | 0,
    rows;
    this.rows = minRows;
    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
    this.rows = minRows + rows;
  });

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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-84377262-1', 'auto');
ga('send', 'pageview');
