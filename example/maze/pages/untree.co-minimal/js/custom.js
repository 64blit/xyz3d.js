AOS.init({
	duration: 800,
	easing: 'slide',
	once: true
});

$(function(){

	'use strict';

	$(".loader").delay(50).fadeOut("slow");
	$("#overlayer").delay(50).fadeOut("slow");	

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
			$('.site-mobile-menu .has-children').each(function(){
				var $this = $(this);

				$this.prepend('<span class="arrow-collapse collapsed">');

				$this.find('.arrow-collapse').attr({
					'data-toggle' : 'collapse',
					'data-target' : '#collapseItem' + counter,
				});

				$this.find('> ul').attr({
					'class' : 'collapse',
					'id' : 'collapseItem' + counter,
				});

				counter++;

			});

		}, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
			var $this = $(this);
			if ( $this.closest('li').find('.collapse').hasClass('show') ) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();  

		});

		$(window).resize(function() {
			var $this = $(this),
			w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$('body').find('.js-menu-toggle').removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$('body').find('.js-menu-toggle').addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
			var container = $(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
					$('body').find('.js-menu-toggle').removeClass('active');
				}
			}
		});
	}; 
	siteMenuClone();

	var owlPlugin = function() {
		if ( $('.owl-3-slider').length > 0 ) {
			var owl3 = $('.owl-3-slider').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 20,
				autoplay: true,
				smartSpeed: 700,
				items: 1,
				stagePadding: 0,
				nav: true,
				dots: true,
				navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>'],
				responsive:{
					0:{
						items:1
					},
					600:{
						items:1
					},
					800: {
						items:2
					},
					1000:{
						items:2
					},
					1100:{
						items:3
					}
				}
			});
		}
		$('.js-custom-next-v2').click(function(e) {
			e.preventDefault();
			owl3.trigger('next.owl.carousel');
		})
		$('.js-custom-prev-v2').click(function(e) {
			e.preventDefault();
			owl3.trigger('prev.owl.carousel');
		})
		if ( $('.owl-4-slider').length > 0 ) {
			var owl4 = $('.owl-4-slider').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 10,
				autoplay: true,
				smartSpeed: 700,
				items: 4,
				nav: false,
				dots: true,
				navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>'],
				responsive:{
					0:{
						items:1
					},
					600:{
						items:2
					},
					800: {
						items:2
					},
					1000:{
						items:3
					},
					1100:{
						items:4
					}
				}
			});
		}
		

		if ( $('.owl-single-text').length > 0 ) {
			var owlText = $('.owl-single-text').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 0,
				mouseDrag: false,
				touchDrag: false,
				autoplay: true,
				smartSpeed: 1200,
				items: 1,
				nav: false,
				navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>']
			});
		}
		if ( $('.owl-single').length > 0 ) {
			var owl = $('.owl-single').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 0,
				autoplay: true,
				smartSpeed: 800,
				mouseDrag: false,
				touchDrag: false,
				items: 1,
				nav: false,
				navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>'],
				onInitialized: counter
			});

			function counter(event) {
				$('.owl-total').text(event.item.count);
			}
			
			$('.js-custom-owl-next').click(function(e) {
				e.preventDefault();
				owl.trigger('next.owl.carousel');
				owlText.trigger('next.owl.carousel');
			})
			$('.js-custom-owl-prev').click(function(e) {
				e.preventDefault();
				owl.trigger('prev.owl.carousel');
				owlText.trigger('prev.owl.carousel');
			})

			$('.owl-dots .owl-dot').each(function(i) {
				$(this).attr('data-index', i - 3);
			});

			owl.on('changed.owl.carousel', function(event) {

				var i = event.item.index;
				if ( i === 1 ) {
					i = event.item.count;
				} else {
					i = i - 1;
				}
				$('.owl-current').text(i);
				$('.owl-total').text(event.item.count);
			})
		}

	}
	owlPlugin();

	var counter = function() {
		
		$('.count-numbers').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ut-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.counter > .number').each(function(){
					var $this = $(this),
					num = $this.data('number');
					$this.animateNumber(
					{
						number: num,
						numberStep: comma_separator_number_step
					}, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	// jarallax
	var jarallaxPlugin = function() {
		if ( $('.jarallax').length > 0 ) {
			$('.jarallax').jarallax({
				speed: 0.2
			});
		}
	};
	jarallaxPlugin();

	

	var accordion = function() {
		$('.btn-link[aria-expanded="true"]').closest('.accordion-item').addClass('active');
		$('.collapse').on('show.bs.collapse', function () {
			$(this).closest('.accordion-item').addClass('active');
		});

		$('.collapse').on('hidden.bs.collapse', function () {
			$(this).closest('.accordion-item').removeClass('active');
		});
	}
	accordion();

	var links = $('.js-hover-focus-one .service-sm')
	.mouseenter(function(){
		links.addClass('unfocus');
		$(this).removeClass('unfocus');
	}).mouseleave(function(){
		$(this).removeClass('unfocus');
		links.removeClass('unfocus');
	})



	var siteIstotope = function() {
		var $container = $('#posts').isotope({
			itemSelector : '.item',
			isFitWidth: true
		});

		$(window).resize(function(){
			$container.isotope({
				columnWidth: '.col-sm-3'
			});
		});

		$container.isotope({ filter: '*' });

		$('#filters').on( 'click', 'a', function(e) {
			e.preventDefault();
			var filterValue = $(this).attr('data-filter');
			$container.isotope({ filter: filterValue });
			$('#filters a').removeClass('active');
			$(this).addClass('active');
		});

		$container.imagesLoaded()
		.progress( function() {
			$container.isotope('layout');
		})
		.done(function() {
			$('.gsap-reveal-img').each(function() {
				var html = $(this).html();
				$(this).html('<div class="reveal-wrap"><span class="cover"></span><div class="reveal-content">'+html+'</div></div>');
			});

			var controller = new ScrollMagic.Controller();

			var revealImg = $('.gsap-reveal-img');

			if ( revealImg.length ) {
				var i = 0;
				revealImg.each(function() {

					var cover = $(this).find('.cover'),
					revealContent = $(this).find('.reveal-content'),
					img = $(this).find('.reveal-content img');


					var tl2 = new TimelineMax();
					setTimeout(function() {
						tl2
						tl2.set(img, {  scale: '1.2', autoAlpha: 1, })
						.to(cover, 1, { marginLeft: '0', ease:Expo.easeInOut, onComplete() {
							tl2.set(revealContent, { autoAlpha: 1 });
							tl2.to(cover, 1, { marginLeft: '102%', ease:Expo.easeInOut });
							tl2.to(img, 2, { scale: '1.0', ease:Linear.easeNone }, '-=2.5');
						} } )

					}, i * 200);



					var scene = new ScrollMagic.Scene({
						triggerElement: this,
						duration: "0%",
						reverse: false,
						offset: "-300%",
					})
					.setTween(tl2)
					.addTo(controller);

					i++;

				});
			}
		})

		$('.js-filter').on('click', function(e) {
			e.preventDefault();
			$('#filters').toggleClass('active');
		});

	}
	siteIstotope();


	var siteGSAPRevealHero = function() {
		var controller = new ScrollMagic.Controller();

		$('.gsap-reveal-hero').each(function() {
			var html = $(this).html();
			$(this).html('<span class="reveal-wrap"><span class="cover"></span><span class="reveal-content">'+html+'</span></span>');
		});
		var grevealhero = $('.gsap-reveal-hero');

		if ( grevealhero.length ) {
			var heroNum = 0;
			grevealhero.each(function() {

				var cover = $(this).find('.cover'),
				revealContent = $(this).find('.reveal-content');

				var tl2 = new TimelineMax();

				setTimeout(function() {

					tl2
					.to(cover, 1, { marginLeft: '0', ease:Expo.easeInOut, onComplete() {
						tl2.set(revealContent, { x: 0 });
						tl2.to(cover, 1, { marginLeft: '102%', ease:Expo.easeInOut });
					} } )
				}, heroNum * 0 );

				var scene = new ScrollMagic.Scene({
					triggerElement: this,
					duration: "0%",
					reverse: false,
					offset: "-300%",
				})
				.setTween(tl2)
				.addTo(controller);

				heroNum++;
			});
		}
	}
	siteGSAPRevealHero();

	var animateElementsScript = function() {
		function animateElements() {
			$('.progressbar').each(function () {
				var elementPos = $(this).offset().top;
				var topOfWindow = $(window).scrollTop();
				var percent = $(this).find('.circle').attr('data-percent');
				var percentage = parseInt(percent, 10) / parseInt(100, 10);
				var animate = $(this).data('animate');
				if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
					$(this).data('animate', true);
					$(this).find('.circle').circleProgress({
						startAngle: -Math.PI / 2,
						value: percent / 100,
						thickness: 4,
						fill: {
							color: '#000000'
						}
					}).on('circle-animation-progress', function (event, progress, stepValue) {
						$(this).find('div').text((stepValue*100).toFixed(0) + "%");
					}).stop();
				}
			});
		}

    // Show animated elements
    animateElements();
    $(window).scroll(animateElements);

};
animateElementsScript();



var OnePageNavigation = function() {
	var navToggler = $('.site-menu-toggle');
	$("body").on("click", ".site-nav-wrap li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a[href^='#']", function(e) {
		e.preventDefault();
		var hash = this.hash;

		$('html, body').animate({

			scrollTop: $(hash).offset().top
		}, 400, 'easeInOutExpo', function(){
			window.location.hash = hash;
		});

	});


};
OnePageNavigation();


// load ajax page
var portfolioItemClick = function() {
	$('.ajax-load-page').on('click', function(e) {

		var id = $(this).data('id'),
		href = $(this).attr('href');

		if ( $('#portfolio-single-holder > div').length ) {
			$('#portfolio-single-holder > div').remove();
		} 

		TweenMax.to('.loader-portfolio-wrap', 1, { top: '-50px', autoAlpha: 1, display: 'block', ease: Power4.easeOut });

		setTimeout(function() {
			$('html, body').animate({
				scrollTop: $('#portfolio-section').offset().top - 50

			}, 700, 'easeInOutExpo', function() {
			});
		}, 200);
		

		setTimeout(function(){
			loadPortfolioSinglePage(id, href);
		}, 100);

		e.preventDefault();

	});

	// Close
	$('body').on('click', '.js-close-portfolio', function() {

		setTimeout(function(){
			$('html, body').animate({
				scrollTop: $('#portfolio-section').offset().top - 50
			}, 700, 'easeInOutExpo');
		}, 200);

		TweenMax.set('.portfolio-wrapper', { visibility: 'visible', height: 'auto' });
		TweenMax.to('.portfolio-single-inner', 1, { marginTop: '50px', opacity: 0,  display: 'none', onComplete() {
			TweenMax.to('.portfolio-wrapper', 1, { marginTop: '0px', autoAlpha: 1, position: 'relative' });

		} });
		
	});
};

$(document).ajaxStop(function(){
	setTimeout(function(){
		TweenMax.to('.loader-portfolio-wrap', 1, { top: '0px', autoAlpha: 0, ease: Power4.easeOut });	
	}, 400);
});

var loadPortfolioSinglePage = function(id, href) {
	$.ajax({
		url: href,
		type: 'GET',
		success: function(html) {

			TweenMax.to('.portfolio-wrapper', 1, { marginTop: '50px', autoAlpha: 0, visibility: 'hidden', onComplete() {
				TweenMax.set('.portfolio-wrapper', { height: 0 });
			} })

			var pSingleHolder = $('#portfolio-single-holder');
			
			var getHTMLContent = $(html).find('.portfolio-single-wrap').html();

			pSingleHolder.append(
				'<div id="portfolio-single-'+id+
				'" class="portfolio-single-inner"><span class="unslate_co--close-portfolio js-close-portfolio d-flex align-items-center"><span class="icon-close2 wrap-icon-close"></span></span>' + getHTMLContent + '</div>'
				);

			setTimeout(function() {
				owlSingleSlider();
				$('html, body').animate({
					scrollTop: $('#portfolio-section').offset().top - 50

				}, 700, 'easeInOutExpo', function() {
				});
			}, 10);

			setTimeout(function() {
				TweenMax.set('.portfolio-single-inner', { marginTop: '100px', autoAlpha: 0, display: 'none' });
				TweenMax.to('.portfolio-single-inner', .5, { marginTop: '0px', autoAlpha: 1, display: 'block', onComplete() {

					TweenMax.to('.loader-portfolio-wrap', 1, { top: '0px', autoAlpha: 0, ease: Power4.easeOut });	
				} });
			}, 700 );
		}
	});

	return false;

};

portfolioItemClick();



var owlSingleSlider = function () {
	if ( $( '.single-slider' ).length ) {
		$('.single-slider').owlCarousel({
			center: false,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			smartSpeed: 1500,
			autoplay: true,
			autoHeight: true,
			autoplayHoverPause: true,
			dots: true,
			nav: true,
			navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>'],

			responsive:{
				400:{
					stagePadding: 0,
					margin: 0,
				},
				600:{
					stagePadding: 0,
					margin: 0,
				}
			}
		});
	}
}


})







