$(document).ready(function(){
                
                //$("ul.accordion > li h2, div.accordion > h2").attr("title","Click to show or hide").append('<span class="icon"></span>');
                $("ul.accordion > li div.inner").hide();
                //$("ul.accordion > li div.accordion").removeClass("current");

                $("ul.accordion > li h2").click(
                       function() {
                           $(this).parent().find("div.inner").slideToggle("fast");
                       }
                );
                
                
                
                
                
});

    function turnOffMainCss()
    {  
       $('link[@rel*=stylesheet][media]').each(function(i) 
       {
                   if (this.getAttribute('media') == "screen") 
           {
               if (this.getAttribute('href') ==  "")
                       this.href = "/Style%20Library/screen.css";
                   else
                       this.href = "";
           }
       });
    }


/* home page carousel */


$(document).ready(function() {
                                                                                                   
                /* JCAROUSEL CODE*/
                
                /* bind functionality to the next/previous buttons used with cycle */
                function carousel_initCallback(carousel) {
                                jQuery('#slideshow_nav_wrapper .next_button').bind('click', function() {
                                                carousel.next();
                                                return false;
                                });
                
                                jQuery('#slideshow_nav_wrapper .previous_button').bind('click', function() {
                                                carousel.prev();
                                                return false;
                                });
                };

                
                /* insane work-around for jcarousels limited support for circular carousels. */
                function carousel_itemVisibleInCallback(carousel, item, i, state, evt) {
                                var idx = carousel.index(i, optionTexts.length);
                                carousel.add(i, optionTexts[idx - 1]);
                                /*$(item).bind('click', function () {
                                                slideshow.cycle(idx-1);
                                                carousel.scroll(idx);
                                });*/
                };
                
                /* insane workaround part 2 */
                function carousel_itemVisibleOutCallback(carousel, item, i, state, evt) {
                                carousel.remove(i);
                };
                 
                 var optionTexts = [];
                 var slideFooter = $('#slideshow_footer ul');
                if (slideFooter.length > 0)
                {
                        // push slideFooter children into an array
                        slideFooter.children('li').each(function() { optionTexts.push($(this).html()) });
                                
                        slideFooter.jcarousel({
                        scroll: 1,
                        size: 3,
                        wrap: 'circular',
                        speed: 1000,
                        itemVisibleInCallback: {onBeforeAnimation: carousel_itemVisibleInCallback},
                        itemVisibleOutCallback: {onAfterAnimation: carousel_itemVisibleOutCallback},
                        initCallback: carousel_initCallback,
                        buttonNextHTML: null,
                        buttonPrevHTML: null
                    });
                }
                
                /* CYCLE CODE */
                var slideshow = $('#slideshow ul');
                if (slideshow.length > 0)
                {
    				slideshow.cycle({
        			fx:                                   'scrollHorz',
        			speed:          300,
        			timeout:      10000,
        			pager:           '#slideshow_nav',
                                next:                     '.next_button',
                                prev:                     '.previous_button',
                                pagerClick:          jumpSlides,
                                after:                     onAfter
    });
    }
                
                function jumpSlides (zeroBasedSlideIndex, slideElement) {
                                slideFooter.data('jcarousel').scroll(zeroBasedSlideIndex+1);
                                return false;
                };
                
                var currentSlide = 1
                function onAfter (currSlideElement, nextSlideElement, options, forwardFlag)
                {
                                slideFooter.data('jcarousel').scroll(options.currSlide+1);
                }

                

});
