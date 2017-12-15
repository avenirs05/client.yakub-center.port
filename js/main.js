jQuery(document).ready(function () {
    var width_window = $(window).width();
    //---------------------------//
    $( ".wsj-doctors-tab" ).tabs({
        active: 0,
        //hide: { effect: "fade", duration: 200 },
        //show: { effect: "fade", duration: 100 }
        activate: function( event, ui ) {
            $('.wsj-doctors-rev-slider').slick('slickNext');
            //$(".wsj-doctors-tab").find('.ui-state-active a').attr('data-link', '');
        } 
    });
    if (width_window < 768) {
        setAccordion();
        setElWidth();
    }
    $(".wsb-doctors__photo").click(function (event) {
        var currentState;
        if (width_window < 768) {
            var Self = $(this).closest('a');
            if ($(Self).attr('data-link') == "wsj-tabs") {
                event.preventDefault();
                var li = $(Self).closest('li');
                if (li.hasClass('ui-state-active')) {
                    $(Self).find('.wsb-doctors__tab-item').attr('aria-hidden', 'true');
                    $(Self).find('.wsb-doctors__tab-item').hide('fast', function(){
                        li.toggleClass('ui-state-active');
                        li.css({backgroundColor: '#fff'});
                        $(Self).css({backgroundColor: '#fff', color: '#575757'});
                        
                    });
                    
                } else {
                    $(".wsj-doctors-tab").find('.ui-state-active').css({backgroundColor: '#fff'});
                    $(".wsj-doctors-tab").find('.ui-state-active a[data-link="wsj-tabs"]').css({backgroundColor: '#fff', color: '#575757'});
                    //$(".wsj-doctors-tab").find('.ui-state-active').toggleClass('ui-state-active');
                    li.toggleClass('ui-state-active');
                    li.addClass('ui-tabs-active');
                    $(Self).find('.wsb-doctors__tab-item').attr('aria-hidden', 'false');
                    $(Self).find('.wsb-doctors__tab-item').css({display: 'block'});
                    $(Self).find('.wsb-doctors__tab-item').show(function() {
                        li.css({backgroundColor: '#03a581'});
                        $(Self).css({color: '#fff'});
                        
                    })
                }   
            }
            /*var id  = $(this).attr('href'),
            top = $(id).offset().top;
            $('body,html').animate({scrollTop: top}, 1500);*/
        }
	});
    //---------------------------//
    //---------------------------//
    $("a").click(function (event) {
        if ($(this).attr('data-link') == "wsj-anchor") {
            event.preventDefault();
            var id  = $(this).attr('href'),
            top = $(id).offset().top;
            $('body,html').animate({scrollTop: top}, 1500);
        }
	});
    //----------------------------//
    if ($('.wsj-doctors-rev-slider').length > 0) {
        $('.wsj-doctors-rev-slider').each(function(){
           $(this).slick({
                arrows: true,
                adaptiveHeight: true
           });
        })
    }
    //---------------------------//
    var wsj_LastPp = $('#popup-thank');
    //--------------------------------
    $('body').append('<a href="javascript:" class="wsj-btn-popup" id="wsj-btn-call-thank" data-id="popup-call-thank"></a>');
    $('form').submit(function(event){
        var result = true;
        $(this).find('input[name="phone"]').each (function (){
            if($(this).val().length <= 0) {
                result = false;   
            } 
        });
        if (!result) {
            $(this).find('input[name="phone"]').css({border:'1px solid #d12727'});
            return false;
        }
        $(this).find('input').val('');
        $(this).find('input[name="phone"]').css({backgroundColor: '#fff'});
        $(this).find('textarea').val('');
        var data = $(this).serialize();
        $.ajax({
          type: 'POST',
          data: data,
          success: function(data) {
            $(wsj_LastPp).hide(function(){
                console.log(wsj_LastPp.attr('id'));
                if (wsj_LastPp.attr('id') != 'popup-call') {
                    if ($('#wsj-btn-thank').length <= 0) {
                        $('body').append('<a href="javascript:" class="wsj-btn-popup" id="wsj-btn-thank" data-id="popup-thank"></a>');
                        $('#wsj-btn-thank').click();
                    } else {
                        $('#wsj-btn-thank').click();
                    }
                } else {
                    $('#wsj-btn-call-thank').click();
                }

            });
          },
          error:  function(xhr, str){
            alert('Возникла ошибка: ' + xhr.responseCode);
          } 
        });
        return false;
    });
    //---------------------------//
    // mask for input
    $('input[name=phone]').mask('+7 ( 999 ) 999-99-99');
    $('input[name=phone]').change(function(){
        if($(this).val().length < 17) {
            $(this).css({backgroundColor: '#95120c'});
        } else {
            $(this).css({backgroundColor: '#abff79'});
        }
    });
    //--------------------------------
    $(function(){
        var PopupBtn = '.wsj-btn-popup';
        var PopupWrap = '.wsj-popup-wrap'
        var PopupElem = '.wsj-popup-elem';
        var PopupClose = '.wsj-popup-close';
        var AnimateTime = 1000;
        var AnimateType = 'clip';
        var Padding = 0.20;
		var StopFlag = 'true';
        if ($(PopupBtn).length > 0) {
            $('body').on('click', PopupBtn, function(event){
                event.preventDefault();
                var popupId = $(this).attr('data-id');
                wsj_LastPp = $('#'+popupId);
                if (popupId.length > 0) {
                    var target = $('#'+popupId);
                    var elem = target.find(PopupElem);
                    var h = $(window).height();
                    
                    if (h < 600) {
                        elem.css({top: '10px'});
                        target.show(AnimateType, AnimateTime, startOV()); 
                    } else {
                        target.show(AnimateType, AnimateTime, function(){
                            elem.css({top: '50%', marginTop: -1*(elem.outerHeight() / 2)});
                            startOV();
                        });
                    }
                }
            });
            $(document).keydown(function(e) {
                if( e.keyCode === 27 ) {
                    $(wsj_LastPp).hide(AnimateType, AnimateTime, returnOV());
                }
            });
            $(PopupElem).bind('click', function(){
				
            }, false);
            $(PopupClose).bind('click', function(){
				event.preventDefault();
				/*if (StopFlag == 'true') {
					StopFlag = 'next';*/
					$('#'+$(this).attr('data-id')).hide(AnimateType, AnimateTime, returnOV());
				/*} else {
					StopFlag = 'true';
				}*/
                
                
            });
            $(PopupWrap).bind('click', function(){
				/*if (StopFlag == 'true') {
					$(this).hide(AnimateType, AnimateTime, returnOV());
				} else if (StopFlag == 'next') {*/
					$(this).hide(AnimateType, AnimateTime, returnOV());
				/*	StopFlag = 'true';	
				} else {
					StopFlag = 'true';
				}*/
            });
        }
        function startOV() {
            $('html,body').css({
                    overflow: 'hidden',
            });
        }
        function returnOV() {
            $('html,body').css({
                overflowY: 'auto',
                overflowX: 'hidden'
            });
        }
    });
    //----------------------------//
    /*Меню (wsb-menu)*/
    $(function(){
        var MenuButton = '.wsj-menu-button';
        var MenuParent = '.wsj-menu-parent';
        var MenuContainer = '.wsj-menu-container';
        if  ($(MenuContainer).length > 0) {
            $(MenuButton).on('click', function(){
                var container = $(this).parent(MenuParent).find(MenuContainer);
                
                $(this).toggleClass('animate');
                if (container.hasClass('ws-show'))
                    container.toggleClass('ws-show').slideUp('normal');
                else
                    container.toggleClass('ws-show').slideDown('normal');
            })    
        }  
    });
    //---------------------------//
    /*Лицензии (hsb-license)*/
    if ($('.wsj-license-interactive').length > 0) {
        $('.wsj-license-interactive').swipebox({
        		useCSS : true, // false will force the use of jQuery for animations
                useSVG : true, // false to force the use of png for buttons
                initialIndexOnArray : 0, // which image index to init when a array is passed
                hideCloseButtonOnMobile : false, // true will hide the close button on mobile devices
                removeBarsOnMobile : false, // false will show top bar on mobile devices
                hideBarsDelay : 3000, // delay before hiding bars on desktop
                videoMaxWidth : 1140, // videos max width
                beforeOpen: function() {}, // called before opening
                afterOpen: null, // called after opening
                afterClose: function() {}, // called after closing
                loopAtEnd: true // true will return to the first image after the last image is reached
        });
        if (width_window < 992) {
            $('.hsb-license__list').slick({
                infinite: true,
                dots: false,
                prevArrow: '.hsb-license__slick-prev',
                nextArrow: '.hsb-license__slick-next',
            });
        }
    }
    //$('.slick-cloned').find('a').attr('rel', '');
    //---------------------------//
    /*Галерея (wsb-gallerye)*/
    if ($('.wsj-gallery-interactive').length > 0) {
        $('.wsj-gallery-interactive').swipebox({
        		useCSS : true, // false will force the use of jQuery for animations
                useSVG : true, // false to force the use of png for buttons
                initialIndexOnArray : 0, // which image index to init when a array is passed
                hideCloseButtonOnMobile : false, // true will hide the close button on mobile devices
                removeBarsOnMobile : false, // false will show top bar on mobile devices
                hideBarsDelay : 3000, // delay before hiding bars on desktop
                videoMaxWidth : 1140, // videos max width
                beforeOpen: function() {}, // called before opening
                afterOpen: null, // called after opening
                afterClose: function() {}, // called after closing
                loopAtEnd: true // true will return to the first image after the last image is reached
        });
    }
    if (width_window < 768) {
        $('.wsj-gallery').slick({
            infinite: true,
            dots: false,
            prevArrow: '.hsb-gallery__slick-prev',
            nextArrow:  '.hsb-gallery__slick-next',
        });
        /*$('.wsj-gallery').slick({
            centerMode:false,
            //autoplay: true,
            infinite: true,
            dots: false,
            slidesToShow: 4,
            variableWidth: false,
            prevArrow: '.wsb-gallery__slick-prev',
            nextArrow: '.wsb-gallery__slick-next',
            responsive: [
              {
                breakpoint: 1199,
                settings: {
                  arrows: false,
                  centerMode: false,
                  variableWidth: false,
                  centerPadding: '0px',
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 991,
                settings: {
                  arrows: false,
                  centerMode: true,
                  variableWidth: false,
                  centerPadding: '0px',
                  slidesToShow: 1
                }
              },
              {
                breakpoint: 640,
                settings: {
                  arrows: false,
                  centerMode: true,
                  variableWidth: false,
                  centerPadding: '0px',
                  slidesToShow: 1
                }
              }
            ]
        });*/
    }
    /**/
    //---------------------------//
    /* map */
    if ($('.hsb-map').length > 0) {
        $('.hsb-map').mouseenter(function(){
            $(this).addClass('active');
        });
        $('.hsb-map').mouseleave(function(){
            $(this).removeClass('active');
        });
    }
    //---------------------------//
    $(window).resize(function(){
        var width = $(window).width();
        if ($('.wsj-review').length > 0) {
            if (width <= 640) {
                $('.wsj-gallery').slick('slickSetOption', 'slidesToShow', 1);
                $('.wsj-gallery').slick('slickSetOption', 'variableWidth', false);
            } else if (width <= 991) {
                $('.wsj-gallery').slick('slickSetOption', 'slidesToShow', 2);
                $('.wsj-gallery').slick('slickSetOption', 'variableWidth', false);

            } else if (width <= 1200) {
                $('.wsj-gallery').slick('slickSetOption', 'slidesToShow', 3);
                $('.wsj-gallery').slick('slickSetOption', 'variableWidth', false);

            } else if (width > 1200) {
                $('.wsj-gallery').slick('slickSetOption', 'slidesToShow', 4);
                $('.wsj-gallery').slick('slickSetOption', 'variableWidth', true);
            }
        }
        if (width < 768) {
            setAccordion();
            setElWidth();
        }
        if (width > 767) {
            setTabs();
        }
    })
    
    function setElWidth() {
        var padding = 30;
        var defWidth = $('.wsb-doctors__headers').width();
        $('.wsb-doctors__tab-item_left').css({width: defWidth-padding});
        $('.wsb-doctors__tab-item_right').css({width: (defWidth-padding), paddingLeft:40, paddingRight:40});
    }
    function setAccordion() {
        $(".wsj-doctors-tab").find('.ws-convert').each(function(){
            var target = $(this).attr('href');
            $(this).append($(target));
        });
        $( ".wsj-doctors-tab" ).tabs( "disable" );
        //$( ".wsj-doctors-tab" ).tabs( "option", "collapsible", true );
    }
    function setTabs() {
        $(".wsj-doctors-tab").find('.ws-convert').each(function(){
            var target = $(this).attr('href');
            $(".wsj-doctors-tab").append($(target));
        });
        $( ".wsj-doctors-tab" ).tabs( "enable" );
        $( ".wsj-doctors-tab" ).tabs( "option", "collapsible", false );
    }
    
    $(function () {
        var $window = $(window),
                win_height_padded = $window.height() * 0.99,
                isTouch = Modernizr.touch;
                
        if (isTouch) {
            revealOnScroll();
        }
        
        
        $window.on('scroll', revealOnScroll);
        
        function revealOnScroll() {
            var scrolled = $window.scrollTop(),
                    win_height_padded = $window.height() * 0.99;
                    
            $(".revealOnScroll:not(.animated)").each(function () {
                var $this = $(this),
                        offsetTop = $this.offset().top;
                if (scrolled + win_height_padded > offsetTop) {
                    if ($this.data('timeout')) {
                        window.setTimeout(function () {
                            $this.addClass('animated ' + $this.data('animation'));
                        }, parseInt($this.data('timeout'), 10));
                    } else {
                        $this.addClass('animated ' + $this.data('animation'));
                    }
                }
            });
            
            $(".revealOnScroll.animated").each(function (index) {
                var $this = $(this),
                        offsetTop = $this.offset().top;
                if (scrolled + win_height_padded < offsetTop) {
                    $(this).removeClass('animated '+ $(this).data('animation'))
                }
            });
        }
        revealOnScroll();
    });
});