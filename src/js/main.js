'use strict'

$(window).scroll(function() {
	// Shrinks header on scroll
	var _header = $('header');
	var distanceY = window.pageYOffset || document.documentElement.scrollTop,
			shrinkOn = 10;

	if (distanceY > shrinkOn) {
		_header.addClass('smaller').css('background','rgba(0,0,0,0.75)');
	} else { 
		if (_header.hasClass('smaller')) {
			_header.removeClass('smaller').css('background','rgba(0,0,0,0)');
		}
	}

	// Looks for data animate attribute and animates set element accordingly
	$('[data-animate]').each(function() {
		var $this = $(this);
		var animation = $this.data('animate');
	  	var delay = $this.attr('data-animate-delay') ? $this.attr('data-animate-delay') : 0;

	  	if ($this.is(':in-viewport') && !jQuery.browser.mobile) {
			setTimeout(function() {
				$this.removeClass('not-animated').addClass("animated").addClass(animation);
			}, delay);
		} 
	});

	// Animates skills progress bar
	$('.percentile:in-viewport').each(function() {
		var _el = $(this);
		var options = [1300, 'swing'];
		var skLvl = _el.closest('.progress-bar').data('progress');

		// _el.text(skLvl + '%');
		_el.prop('Counter', 0).animate({
			Counter: skLvl
		}, {
			duration  :  options[0],
			easing    : options[1],
			step      : function (percent) {
				_el.text(Math.ceil(percent) + '%');
			}
		});

		_el.parent().animate({
			width  :  skLvl + '%'
		}, options[0], options[1]);
	});
});

$(document).ready(function() {	

	$(function() {
		var _windowH = $(window).height(),
    	_jumbotronH = $('#jumbotron').height();

    if (_windowH <= (_jumbotronH + 60)) {
        var _windowH = _jumbotronH + 60
    }

    $('#jumbotron .jumbo-desktop').attr('style', 'height:'+ _windowH +'px;');
    $('#jumbotron .jumbo-mobile').attr('style', 'height:'+ _windowH +'px;');
	});

	// Enables smooth scrolling when using the main navigation
	$('.scroll-to').on('click', function(){
		var _this = $(this),
				_currSection = _this.attr('href');

    $('html, body').animate({
        scrollTop: $(_currSection).offset().top - 100
    }, 500);

    // $('.mobile-nav').find('.current').removeClass('current');
    // _this.closest('li').addClass('current');

    if (!$('.mobile-nav').hasClass('collapsed') && $('#mobile-menu-icon').hasClass('open')) {
	   $('.mobile-nav').addClass('collapsed');
	   $('#mobile-menu-icon').removeClass('open');
		}
    return false;
	});

	function waypoint() {
		// find the a children of the list items
		var _getAnchors = $(".mobile-nav li").children();
    var _anchorArray = []; // create the empty aArray
    var i;

    // this for loop fills the aArray with attribute href values
    for (i = 0; i < _getAnchors.length; i++) {    
      var _anchors = _getAnchors[i],
      		_anchorsHref = $(_anchors).attr('href');

      _anchorArray.push(_anchorsHref);
    } 

    $(window).scroll(function() {
      var _windowPos = $(window).scrollTop(),
      		_windowHeight = $(window).height(), 
      		_docHeight = $(document).height();

      for (i = 0; i < _anchorArray.length; i++) {
        var _currentSection = _anchorArray[i],
        		_sectionPos = $(_currentSection).offset().top - 120,
        		_sectionHeight = $(_currentSection).height(); 
        
        if (_windowPos >= _sectionPos && _windowPos < (_sectionPos + _sectionHeight)) {
          $("a[href='" + _currentSection + "']").addClass("nav-active");
        } else {
          $("a[href='" + _currentSection + "']").removeClass("nav-active");
        }
      }

      if(_windowPos + _windowHeight == _docHeight) {
        if (!$(".mobile-nav li:last-child a").hasClass("nav-active")) {
          var navActiveCurrent = $(".nav-active").attr("href");

          $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
          $(".mobile-nav li:last-child a").addClass("nav-active");
        }
      }
    });
	}waypoint();

	// Mobile menu
	$('#mobile-menu-icon').on('click', function(){
		var menu = $('.mobile-nav');
		$(this).toggleClass('open');

		if (menu.hasClass('collapsed')) {
			menu.removeClass('collapsed');
		} else {
			menu.addClass('collapsed');
		}
	});

	// Initialize masonry and allow filtering
	(function() {
		// initialize Masonry
		var $container = $('#portfolio-container');

		$container.imagesLoaded().progress(function() {
			$container.masonry({
				itemSelector: '.portfolio-item',
				percentPosition: true,
				columnWidth: '.grid-sizer'
			});

			$('#filters input[type=checkbox]').on('change', function() {
				var _this = $(this),
				currSelected = _this.val(),
				currItem = '.' + currSelected;
				$container.masonry('layout');
				// remove all instaces of .active
				$('.filter').removeClass('active');

				// add .active to currect change event
				_this.closest('.filter').addClass('active');

				// allows checkboxes to act like radio buttons
				$('input.checkbox').not(this).prop('checked',false);

				if (_this.is(':checked')) {
					$('.portfolio-item').hide();
					$(currItem).show();
					$container.masonry('layout');
				} else {
					$('.portfolio-item').show();
					$('.filter').removeClass('active');
					$('.all').prop('checked', true).closest('.filter').addClass('active');
					$container.masonry('layout');
				}
			});
		});
	})();

	// Lighbox/Modal
	$(function () {
		'use strict';

		function openModal(_getImage) {
			// Builds modal and overlay into the DOM
			var _template;
					_template = '<div class="overlay" />',
					_template += '<div class="modal">',
					_template += '<div class="close">Click Outside To Close Modal</div>',
					_template += '<img src="images/tmp/portfolio/' + _getImage + '" /></div>';

			$('body').append(_template)
				.css({"overflow":"hidden"}); // do not allow scrolling

			$('.overlay').animate({"opacity":"0.75"}, 300, "linear");

			$('.modal img').load(function () {
				var _imgW = $(this).outerWidth(),
						_imgH = $(this).outerHeight();

				$('.modal')
					.css({
						"width"				: _imgW,
						"height"			: _imgH,
						"margin-top"  : -(_imgH/2),
						"margin-left" : -(_imgW/2)
					})
					.animate({"opacity":"1"}, 300, "linear");
			});
		}

		$('.lightbox').on('click', function (evt) {
			var _getImage = $(this).attr('href');
			// evt.preventDefault();
			openModal(_getImage);
			return false;
		});	

		// close modal when click occurs outside 
		$(document).mouseup(function (e) {
		var container = $('.modal');
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			$('.modal, .overlay')
					.animate({"opacity":"0"}, 300, "linear", function () {
						$('.modal, .overlay').remove();
						$('body').removeAttr('style');
					});
		}
		});
	});

	setTimeout(function (){
		// Takes away animations when viewing in mobile devices
		if (jQuery.browser.mobile) {
			console.log($('.not-animated').length);
			$('.not-animated').removeClass('not-animated');
		}
	}, 200);
});