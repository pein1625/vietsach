// menu toggle
$(function () {
  $(".menu-toggle").on("click", function () {
    var $toggle = $(this);

    $toggle.toggleClass("active").siblings(".menu-sub").slideToggle();

    $toggle.siblings(".menu-mega").children(".menu-sub").slideToggle();

    $toggle.parent().siblings(".menu-item-group").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-mega").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-toggle").removeClass("active");
  });

  $(".menu-item-group > .menu-link, .menu-item-mega > .menu-link").on("click", function (e) {
    if ($(window).width() < 1200 || !mobileAndTabletCheck()) return;

    e.preventDefault();
  });
});

// navbar mobile toggle
$(function () {
  var $body = $("html, body");
  var $navbar = $(".js-navbar");
  var $navbarToggle = $(".js-navbar-toggle");

  $navbarToggle.on("click", function () {
    $navbarToggle.toggleClass("active");
    $navbar.toggleClass("is-show");
    $body.toggleClass("overflow-hidden");
  });
});

$(function () {
  var $moveTop = $(".btn-movetop");
  var $window = $(window);
  var $body = $("html");

  if (!$moveTop.length) return;

  $window.on("scroll", function () {
    if ($window.scrollTop() > 150) {
      $moveTop.addClass("show");

      return;
    }

    $moveTop.removeClass("show");
  });

  $moveTop.on("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
});

// swiper template
function addSwiper(selector, options = {}) {
  return Array.from(document.querySelectorAll(selector), function (item) {
    var $sliderContainer = $(item),
        $sliderEl = $sliderContainer.find(selector + "__container");

    if (options.navigation) {
      $sliderContainer.addClass("has-nav");
      options.navigation = {
        prevEl: $sliderContainer.find(selector + "__prev"),
        nextEl: $sliderContainer.find(selector + "__next")
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass("has-pagination");
      options.pagination = {
        el: $sliderContainer.find(selector + "__pagination"),
        clickable: true
      };
    }

    return new Swiper($sliderEl, options);
  });
}

$(function () {
  addSwiper('.banner-slider', {
    pagination: true,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    }
  });
});

$(function () {
  addSwiper('.news-slider', {
    loop: true,
    pagination: true,
    spaceBetween: 16,
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 30
      }
    }
  });
});

$(function () {
  addSwiper('.partner-slider', {
    loop: true,
    navigation: true,
    spaceBetween: 16,
    slidesPerView: 3,
    breakpoints: {
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 5
      }
    }
  });
});

$(function () {

  const $window = $(window);

  const $header = $('.header');

  $window.on('scroll', function () {

    let height = 35;

    if ($window.width() > 1500) height = 40;

    console.log('height:', height);

    if ($window.scrollTop() > height) {

      $header.addClass('is-fixed');
    } else {

      $header.removeClass('is-fixed');
    }
  });
});

$(function () {

  $('.js-copy-link').on('click', function (e) {

    e.preventDefault();

    const url = $(this).attr('href');

    const $span = $(this).find('span');

    $span.text('Copied');

    copyTextToClipboard(url);

    setTimeout(() => {

      $span.text('Copy link');
    }, 1000);
  });
});

$(function () {

  floating();
});

function fallbackCopyTextToClipboard(text) {

  var textArea = document.createElement("textarea");

  textArea.value = text;

  // Avoid scrolling to bottom

  textArea.style.top = "0";

  textArea.style.left = "0";

  textArea.style.position = "fixed";

  document.body.appendChild(textArea);

  textArea.focus();

  textArea.select();

  try {

    var successful = document.execCommand('copy');

    var msg = successful ? 'successful' : 'unsuccessful';

    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {

    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {

  if (!navigator.clipboard) {

    fallbackCopyTextToClipboard(text);

    return;
  }

  navigator.clipboard.writeText(text).then(function () {

    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {

    console.error('Async: Could not copy text: ', err);
  });
}

// floating

function floating() {

  $(".floating").each(function () {

    var $floating = $(this),
        width = $floating.width(),
        offsetLeft = $floating.offset().left,
        offsetTop = $floating.offset().top;

    $floating.data("offsetLeft", offsetLeft).data("offsetTop", offsetTop).css({

      width: width

    });
  });

  if ($(window).width() < 992) {

    return;
  }

  $(window).on("scroll", function () {

    $(".floating").each(function () {

      var $floating = $(this),
          offsetTop = $floating.data("offsetTop"),
          offsetLeft = $floating.data("offsetLeft"),
          height = $floating.outerHeight(),
          outerHeight = $floating.outerHeight(true),
          $container = $floating.closest(".floating-container"),
          dataTop = $floating.data("top"),
          top = dataTop !== undefined ? parseInt(dataTop) : 30,
          containerHeight = $container.outerHeight(),
          containerOffsetTop = $container.offset().top,
          scrollTop = $(window).scrollTop();

      if (outerHeight + offsetTop == containerHeight + containerOffsetTop) {

        return;
      } else if (scrollTop + top <= offsetTop) {

        $(this).css({

          position: "static"

        });
      } else if (scrollTop + height + top > containerHeight + containerOffsetTop) {

        $(this).css({

          position: "absolute",

          zIndex: 2,

          top: "auto",

          bottom: 0,

          left: "15px"

        });
      } else {

        $(this).css({

          position: "fixed",

          zIndex: 2,

          top: top,

          left: offsetLeft,

          bottom: "auto"

        });
      }
    });
  });
}