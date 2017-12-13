

(function($) {

	var settings = {

		// Carousels
			carousels: {
				speed: 4,
				fadeIn: true,
				fadeDelay: 250
			},

	};

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 960px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				speed: 350,
				noOpenerFade: true,
				alignment: 'center'
			});

		// Scrolly links.
			$('.scrolly').scrolly();

		// Off-Canvas Navigation.

			// Navigation Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Carousels.
			$('.carousel').each(function() {

				var	$t = $(this),
					$forward = $('<span class="forward"></span>'),
					$backward = $('<span class="backward"></span>'),
					$reel = $t.children('.reel'),
					$items = $reel.children('article');

				var	pos = 0,
					leftLimit,
					rightLimit,
					itemWidth,
					reelWidth,
					timerId;

				// Items.
					if (settings.carousels.fadeIn) {

						$items.addClass('loading');

						$t.onVisible(function() {
							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);

							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();

								if (x.length <= limit) {

									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;

								}

								if (skel.vars.IEVersion < 10) {

									xf.fadeTo(750, 1.0);
									window.setTimeout(function() {
										xf.removeClass('loading');
									}, 50);

								}
								else
									xf.removeClass('loading');

							}, settings.carousels.fadeDelay);
						}, 50);
					}

				// Main.
					$t._update = function() {
						pos = 0;
						rightLimit = (-1 * reelWidth) + $window.width();
						leftLimit = 0;
						$t._updatePos();
					};

					if (skel.vars.IEVersion < 9)
						$t._updatePos = function() { $reel.css('left', pos); };
					else
						$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

				// Forward.
					$forward
						.appendTo($t)
						.hide()
						.mouseenter(function(e) {
							timerId = window.setInterval(function() {
								pos -= settings.carousels.speed;

								if (pos <= rightLimit)
								{
									window.clearInterval(timerId);
									pos = rightLimit;
								}

								$t._updatePos();
							}, 10);
						})
						.mouseleave(function(e) {
							window.clearInterval(timerId);
						});

				// Backward.
					$backward
						.appendTo($t)
						.hide()
						.mouseenter(function(e) {
							timerId = window.setInterval(function() {
								pos += settings.carousels.speed;

								if (pos >= leftLimit) {

									window.clearInterval(timerId);
									pos = leftLimit;

								}

								$t._updatePos();
							}, 10);
						})
						.mouseleave(function(e) {
							window.clearInterval(timerId);
						});

				// Init.
					$window.load(function() {

						reelWidth = $reel[0].scrollWidth;

						skel.on('change', function() {

							if (skel.vars.touch) {

								$reel
									.css('overflow-y', 'hidden')
									.css('overflow-x', 'scroll')
									.scrollLeft(0);
								$forward.hide();
								$backward.hide();

							}
							else {

								$reel
									.css('overflow', 'visible')
									.scrollLeft(0);
								$forward.show();
								$backward.show();

							}

							$t._update();

						});

						$window.resize(function() {
							reelWidth = $reel[0].scrollWidth;
							$t._update();
						}).trigger('resize');

					});

			});

	});

})(jQuery);


$(document).ready(function() {

$("#button2").click(function() {
    $('html, body').animate({
        scrollTop: $("#move").offset().top
    }, 1500);
});




  $('.no, .email').hide();

  $('.phone').click(function() {
    $('.email').slideUp(function() {
      $('.no').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no').slideUp(function() {
      $('.email').slideToggle();
    });
  });
});










$(document).ready(function() {
  $('.no1, .email1').hide();

  $('.phone1').click(function() {
    $('.email1').slideUp(function() {
      $('.no1').slideToggle();
    });
  });

  $('.mail1').click(function() {
    $('.no1').slideUp(function() {
      $('.email1').slideToggle();
    });
  });
});










$(document).ready(function() {
  $('.no2, .email2').hide();

  $('.phone2').click(function() {
    $('.email2').slideUp(function() {
      $('.no2').slideToggle();
    });
  });

  $('.mail2').click(function() {
    $('.no2').slideUp(function() {
      $('.email2').slideToggle();
    });
  });
});





$(document).ready(function() {
  $('.no3, .email3').hide();

  $('.phone3').click(function() {
    $('.email3').slideUp(function() {
      $('.no3').slideToggle();
    });
  });

  $('.mail3').click(function() {
    $('.no3').slideUp(function() {
      $('.email3').slideToggle();
    });
  });
});








$(document).ready(function() {
  $('.no4, .email4').hide();

  $('.phone4').click(function() {
    $('.email4').slideUp(function() {
      $('.no4').slideToggle();
    });
  });

  $('.mail4').click(function() {
    $('.no4').slideUp(function() {
      $('.email4').slideToggle();
    });
  });
});





$(document).ready(function() {
  $('.no5, .email5').hide();

  $('.phone5').click(function() {
    $('.email5').slideUp(function() {
      $('.no5').slideToggle();
    });
  });

  $('.mail5').click(function() {
    $('.no5').slideUp(function() {
      $('.email5').slideToggle();
    });
  });
});








$(document).ready(function() {
  $('.no6, .email6').hide();

  $('.phone6').click(function() {
    $('.email6').slideUp(function() {
      $('.no6').slideToggle();
    });
  });

  $('.mail6').click(function() {
    $('.no6').slideUp(function() {
      $('.email6').slideToggle();
    });
  });
});







$(document).ready(function() {
  $('.no7, .email7').hide();

  $('.phone7').click(function() {
    $('.email7').slideUp(function() {
      $('.no7').slideToggle();
    });
  });

  $('.mail7').click(function() {
    $('.no7').slideUp(function() {
      $('.email7').slideToggle();
    });
  });
});







$(document).ready(function() {
  $('.no8, .email8').hide();

  $('.phone8').click(function() {
    $('.email8').slideUp(function() {
      $('.no8').slideToggle();
    });
  });

  $('.mail8').click(function() {
    $('.no8').slideUp(function() {
      $('.email8').slideToggle();
    });
  });
});






$(document).ready(function() {
  $('.no9, .email9').hide();

  $('.phone9').click(function() {
    $('.email9').slideUp(function() {
      $('.no9').slideToggle();
    });
  });

  $('.mail9').click(function() {
    $('.no9').slideUp(function() {
      $('.email9').slideToggle();
    });
  });
});










$(document).ready(function() {
  $('.no10, .email10').hide();

  $('.phone10').click(function() {
    $('.email10').slideUp(function() {
      $('.no10').slideToggle();
    });
  });

  $('.mail10').click(function() {
    $('.no10').slideUp(function() {
      $('.email10').slideToggle();
    });
  });
});




$(document).ready(function() {
  $('.no14, .email14').hide();

  $('.phone14').click(function() {
    $('.email14').slideUp(function() {
      $('.no14').slideToggle();
    });
  });

  $('.mail14').click(function() {
    $('.no14').slideUp(function() {
      $('.email14').slideToggle();
    });
  });
});



$(document).ready(function() {
  $('.no11, .email11').hide();

  $('.phone11').click(function() {
    $('.email11').slideUp(function() {
      $('.no11').slideToggle();
    });
  });

  $('.mail11').click(function() {
    $('.no11').slideUp(function() {
      $('.email11').slideToggle();
    });
  });
});



$(document).ready(function() {
  $('.no12, .email12').hide();

  $('.phone12').click(function() {
    $('.email12').slideUp(function() {
      $('.no12').slideToggle();
    });
  });

  $('.mail12').click(function() {
    $('.no12').slideUp(function() {
      $('.email12').slideToggle();
    });
  });
});



$(document).ready(function() {
  $('.no13, .email13').hide();

  $('.phone13').click(function() {
    $('.email13').slideUp(function() {
      $('.no13').slideToggle();
    });
  });

  $('.mail13').click(function() {
    $('.no13').slideUp(function() {
      $('.email13').slideToggle();
    });
  });
});


$(document).ready(function() {
  $('.no15, .email15').hide();

  $('.phone15').click(function() {
    $('.email15').slideUp(function() {
      $('.no15').slideToggle();
    });
  });

  $('.mail15').click(function() {
    $('.no15').slideUp(function() {
      $('.email15').slideToggle();
    });
  });
});












