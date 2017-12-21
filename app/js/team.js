

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

$(document).ready(function() {
  $('.no16, .email16').hide();

  $('.phone16').click(function() {
    $('.email16').slideUp(function() {
      $('.no16').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no16').slideUp(function() {
      $('.email16').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no17, .email17').hide();

  $('.phone17').click(function() {
    $('.email17').slideUp(function() {
      $('.no17').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no17').slideUp(function() {
      $('.email17').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no18, .email18').hide();

  $('.phone18').click(function() {
    $('.email18').slideUp(function() {
      $('.no18').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no18').slideUp(function() {
      $('.email18').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no19, .email19').hide();

  $('.phone19').click(function() {
    $('.email19').slideUp(function() {
      $('.no19').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no19').slideUp(function() {
      $('.email19').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no20, .email20').hide();

  $('.phone20').click(function() {
    $('.email20').slideUp(function() {
      $('.no20').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no20').slideUp(function() {
      $('.email20').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no21, .email21').hide();

  $('.phone21').click(function() {
    $('.email21').slideUp(function() {
      $('.no21').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no21').slideUp(function() {
      $('.email21').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no22, .email22').hide();

  $('.phone22').click(function() {
    $('.email22').slideUp(function() {
      $('.no22').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no22').slideUp(function() {
      $('.email22').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no23, .email23').hide();

  $('.phone23').click(function() {
    $('.email23').slideUp(function() {
      $('.no23').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no23').slideUp(function() {
      $('.email23').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no24, .email24').hide();

  $('.phone24').click(function() {
    $('.email24').slideUp(function() {
      $('.no24').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no24').slideUp(function() {
      $('.email24').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no25, .email25').hide();

  $('.phone25').click(function() {
    $('.email25').slideUp(function() {
      $('.no25').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no25').slideUp(function() {
      $('.email25').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no26, .email26').hide();

  $('.phone26').click(function() {
    $('.email26').slideUp(function() {
      $('.no26').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no26').slideUp(function() {
      $('.email26').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no27, .email27').hide();

  $('.phone27').click(function() {
    $('.email27').slideUp(function() {
      $('.no27').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no27').slideUp(function() {
      $('.email27').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no28, .email28').hide();

  $('.phone28').click(function() {
    $('.email28').slideUp(function() {
      $('.no28').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no28').slideUp(function() {
      $('.email28').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no29, .email29').hide();

  $('.phone29').click(function() {
    $('.email29').slideUp(function() {
      $('.no29').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no29').slideUp(function() {
      $('.email29').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no30, .email30').hide();

  $('.phone30').click(function() {
    $('.email30').slideUp(function() {
      $('.no30').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no30').slideUp(function() {
      $('.email30').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no31, .email31').hide();

  $('.phone31').click(function() {
    $('.email31').slideUp(function() {
      $('.no31').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no31').slideUp(function() {
      $('.email31').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no32, .email32').hide();

  $('.phone32').click(function() {
    $('.email32').slideUp(function() {
      $('.no32').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no32').slideUp(function() {
      $('.email32').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no33, .email33').hide();

  $('.phone33').click(function() {
    $('.email33').slideUp(function() {
      $('.no33').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no33').slideUp(function() {
      $('.email33').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no34, .email34').hide();

  $('.phone34').click(function() {
    $('.email34').slideUp(function() {
      $('.no34').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no34').slideUp(function() {
      $('.email34').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no35, .email35').hide();

  $('.phone35').click(function() {
    $('.email35').slideUp(function() {
      $('.no35').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no35').slideUp(function() {
      $('.email35').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no36, .email36').hide();

  $('.phone36').click(function() {
    $('.email36').slideUp(function() {
      $('.no36').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no36').slideUp(function() {
      $('.email36').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no37, .email37').hide();

  $('.phone37').click(function() {
    $('.email37').slideUp(function() {
      $('.no37').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no37').slideUp(function() {
      $('.email37').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no38, .email38').hide();

  $('.phone38').click(function() {
    $('.email38').slideUp(function() {
      $('.no38').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no38').slideUp(function() {
      $('.email38').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no39, .email39').hide();

  $('.phone39').click(function() {
    $('.email39').slideUp(function() {
      $('.no39').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no39').slideUp(function() {
      $('.email39').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no40, .email40').hide();

  $('.phone40').click(function() {
    $('.email40').slideUp(function() {
      $('.no40').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no40').slideUp(function() {
      $('.email40').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no41, .email41').hide();

  $('.phone41').click(function() {
    $('.email41').slideUp(function() {
      $('.no41').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no41').slideUp(function() {
      $('.email41').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no42, .email42').hide();

  $('.phone42').click(function() {
    $('.email42').slideUp(function() {
      $('.no42').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no42').slideUp(function() {
      $('.email42').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no43, .email43').hide();

  $('.phone43').click(function() {
    $('.email43').slideUp(function() {
      $('.no43').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no43').slideUp(function() {
      $('.email43').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no44, .email44').hide();

  $('.phone44').click(function() {
    $('.email44').slideUp(function() {
      $('.no44').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no44').slideUp(function() {
      $('.email44').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no45, .email45').hide();

  $('.phone45').click(function() {
    $('.email45').slideUp(function() {
      $('.no45').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no45').slideUp(function() {
      $('.email45').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no46, .email46').hide();

  $('.phone46').click(function() {
    $('.email46').slideUp(function() {
      $('.no46').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no46').slideUp(function() {
      $('.email46').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no47, .email47').hide();

  $('.phone47').click(function() {
    $('.email47').slideUp(function() {
      $('.no47').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no47').slideUp(function() {
      $('.email47').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no48, .email48').hide();

  $('.phone48').click(function() {
    $('.email48').slideUp(function() {
      $('.no48').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no48').slideUp(function() {
      $('.email48').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no49, .email49').hide();

  $('.phone49').click(function() {
    $('.email49').slideUp(function() {
      $('.no49').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no49').slideUp(function() {
      $('.email49').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no50, .email50').hide();

  $('.phone50').click(function() {
    $('.email50').slideUp(function() {
      $('.no50').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no50').slideUp(function() {
      $('.email50').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no51, .email51').hide();

  $('.phone51').click(function() {
    $('.email51').slideUp(function() {
      $('.no51').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no51').slideUp(function() {
      $('.email51').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no52, .email52').hide();

  $('.phone52').click(function() {
    $('.email52').slideUp(function() {
      $('.no52').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no52').slideUp(function() {
      $('.email52').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no53, .email53').hide();

  $('.phone53').click(function() {
    $('.email53').slideUp(function() {
      $('.no53').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no53').slideUp(function() {
      $('.email53').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no54, .email54').hide();

  $('.phone54').click(function() {
    $('.email54').slideUp(function() {
      $('.no54').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no54').slideUp(function() {
      $('.email54').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no55, .email55').hide();

  $('.phone55').click(function() {
    $('.email55').slideUp(function() {
      $('.no55').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no55').slideUp(function() {
      $('.email55').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no56, .email56').hide();

  $('.phone56').click(function() {
    $('.email56').slideUp(function() {
      $('.no56').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no56').slideUp(function() {
      $('.email56').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no57, .email57').hide();

  $('.phone57').click(function() {
    $('.email57').slideUp(function() {
      $('.no57').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no57').slideUp(function() {
      $('.email57').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no58, .email58').hide();

  $('.phone58').click(function() {
    $('.email58').slideUp(function() {
      $('.no58').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no58').slideUp(function() {
      $('.email58').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no59, .email59').hide();

  $('.phone59').click(function() {
    $('.email59').slideUp(function() {
      $('.no59').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no59').slideUp(function() {
      $('.email59').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no60, .email60').hide();

  $('.phone60').click(function() {
    $('.email60').slideUp(function() {
      $('.no60').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no60').slideUp(function() {
      $('.email60').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no61, .email61').hide();

  $('.phone61').click(function() {
    $('.email61').slideUp(function() {
      $('.no61').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no61').slideUp(function() {
      $('.email61').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no62, .email62').hide();

  $('.phone62').click(function() {
    $('.email62').slideUp(function() {
      $('.no62').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no62').slideUp(function() {
      $('.email62').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no63, .email63').hide();

  $('.phone63').click(function() {
    $('.email63').slideUp(function() {
      $('.no63').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no63').slideUp(function() {
      $('.email63').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no64, .email64').hide();

  $('.phone64').click(function() {
    $('.email64').slideUp(function() {
      $('.no64').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no64').slideUp(function() {
      $('.email64').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no65, .email65').hide();

  $('.phone65').click(function() {
    $('.email65').slideUp(function() {
      $('.no65').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no65').slideUp(function() {
      $('.email65').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no66, .email66').hide();

  $('.phone66').click(function() {
    $('.email66').slideUp(function() {
      $('.no66').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no66').slideUp(function() {
      $('.email66').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no67, .email67').hide();

  $('.phone67').click(function() {
    $('.email67').slideUp(function() {
      $('.no67').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no67').slideUp(function() {
      $('.email67').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no68, .email68').hide();

  $('.phone68').click(function() {
    $('.email68').slideUp(function() {
      $('.no68').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no68').slideUp(function() {
      $('.email68').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no69, .email69').hide();

  $('.phone69').click(function() {
    $('.email69').slideUp(function() {
      $('.no69').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no69').slideUp(function() {
      $('.email69').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no70, .email70').hide();

  $('.phone70').click(function() {
    $('.email70').slideUp(function() {
      $('.no70').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no70').slideUp(function() {
      $('.email70').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no71, .email71').hide();

  $('.phone71').click(function() {
    $('.email71').slideUp(function() {
      $('.no71').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no71').slideUp(function() {
      $('.email71').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no72, .email72').hide();

  $('.phone72').click(function() {
    $('.email72').slideUp(function() {
      $('.no72').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no72').slideUp(function() {
      $('.email72').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no73, .email73').hide();

  $('.phone73').click(function() {
    $('.email73').slideUp(function() {
      $('.no73').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no73').slideUp(function() {
      $('.email73').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no74, .email74').hide();

  $('.phone74').click(function() {
    $('.email74').slideUp(function() {
      $('.no74').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no74').slideUp(function() {
      $('.email74').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no75, .email75').hide();

  $('.phone75').click(function() {
    $('.email75').slideUp(function() {
      $('.no75').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no75').slideUp(function() {
      $('.email75').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no76, .email76').hide();

  $('.phone76').click(function() {
    $('.email76').slideUp(function() {
      $('.no76').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no76').slideUp(function() {
      $('.email76').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no77, .email77').hide();

  $('.phone77').click(function() {
    $('.email77').slideUp(function() {
      $('.no77').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no77').slideUp(function() {
      $('.email77').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no78, .email78').hide();

  $('.phone78').click(function() {
    $('.email78').slideUp(function() {
      $('.no78').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no78').slideUp(function() {
      $('.email78').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no79, .email79').hide();

  $('.phone79').click(function() {
    $('.email79').slideUp(function() {
      $('.no79').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no79').slideUp(function() {
      $('.email79').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no80, .email80').hide();

  $('.phone80').click(function() {
    $('.email80').slideUp(function() {
      $('.no80').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no80').slideUp(function() {
      $('.email80').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no81, .email81').hide();

  $('.phone81').click(function() {
    $('.email81').slideUp(function() {
      $('.no81').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no81').slideUp(function() {
      $('.email81').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no82, .email82').hide();

  $('.phone82').click(function() {
    $('.email82').slideUp(function() {
      $('.no82').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no82').slideUp(function() {
      $('.email82').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no83, .email83').hide();

  $('.phone83').click(function() {
    $('.email83').slideUp(function() {
      $('.no83').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no83').slideUp(function() {
      $('.email83').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no84, .email84').hide();

  $('.phone84').click(function() {
    $('.email84').slideUp(function() {
      $('.no84').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no84').slideUp(function() {
      $('.email84').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no85, .email85').hide();

  $('.phone85').click(function() {
    $('.email85').slideUp(function() {
      $('.no85').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no85').slideUp(function() {
      $('.email85').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no86, .email86').hide();

  $('.phone86').click(function() {
    $('.email86').slideUp(function() {
      $('.no86').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no86').slideUp(function() {
      $('.email86').slideToggle();
    });
  });
});

$(document).ready(function() {
  $('.no87, .email87').hide();

  $('.phone87').click(function() {
    $('.email87').slideUp(function() {
      $('.no87').slideToggle();
    });
  });

  $('.mail').click(function() {
    $('.no87').slideUp(function() {
      $('.email87').slideToggle();
    });
  });
});












