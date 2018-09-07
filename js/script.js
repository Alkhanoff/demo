/* Author:

*/

$(document).ready(function () {
    //Adding Classes
    $('#breadcrumb ul li').last().addClass('no-background');
    $('.featured-publication article').last().css('border-bottom', 'none');
    $('.number-of-results a').first().css('margin-left', '10px');
    $('.slideToggle section').last().css('border-bottom', 'none');

    //Tabs
    //$(".tab-container").each(function () {
    //    var $container = $(this);
    //    $container.find(".tab-content").not(":eq(0)").hide();
    //    $(".tabs li a:eq(0)").addClass("selected");
    //    $container.find(".tabs li").click(function (e) {
    //        if (!$(this).hasClass("selected")) {
    //            $(".tabs li").removeClass("selected");
    //            $(".tab-content").hide();
    //            $(this).addClass("selected");
    //            $($container.find(".tabs li.selected a").attr("href")).show();
    //        }
    //        e.preventDefault();
    //    });
    //});


    //accordion
    /*$('.explore-all-articles h3').click(function () {
    $('.slideToggle').slideToggle('slow');
    });*/
    $('.explore-all-articles').ryaccordion({ handle: 'h3', contentElement: 'li', startAsOpen: false });

    //explore-publictions selector checkboxes
    $('.explore-all-articles input[type="checkbox"]').addClass('hidden');
    $('.explore-cancel').css('display', 'inline-block');

    $('.explore-all-articles label').toggle(function () {
        var name = $(this).attr('for');
        $(this).addClass('selected');
        $('input[id="' + name + '"]').attr('checked', 'checked');
    }, function () {
        var name = $(this).attr('for');
        $(this).removeClass('selected');
        $('input[id="' + name + '"]').removeAttr('checked');
    });

    $('.explore-cancel').click(function () {
        $('.accordion_content input[type="checkbox"]').removeAttr('checked');
        $('.accordion_content label[class="selected"]').removeClass('selected');
        return false;
    });

    $('.explore-this-issue').ryaccordion({ handle: 'h3', contentElement: 'li', startAsOpen: true });

    //explore-this-issue selector checkboxes
    $('.explore-this-issue input[type="checkbox"]').addClass('hidden');

    $('.explore-this-issue label').toggle(function () {
        var name = $(this).attr('for');
        $(this).addClass('selected');
        $('input[id="' + name + '"]').attr('checked', 'checked');
    }, function () {
        var name = $(this).attr('for');
        $(this).removeClass('selected');
        $('input[id="' + name + '"]').removeAttr('checked');
    });

    //HoverStaff
    $('ul.publications li').hover(function () {
        $(this).find('.social-links').show();
    }, function () {
        $(this).find('.social-links').hide();
    });

    //Append
    $('.explore-all-articles h3').append('<span><div class="accordion-arrow" style="display:block!important;"></div></span>');
    $('.explore-this-issue h3').append('<span><div class="accordion-arrow" style="display:block!important;"></div></span>');

    //Hide Staff
    /*$('.accordion-arrow').hide();*/


    //Colorbox
    $(".pop-up").colorbox({ iframe: true, innerWidth: 425, innerHeight: 344 });


    //Ajax Load
    /*$(".col-2 .pagination-container a").click(function (e) {
    var url = $(this).attr("href");
    $("#content-load").load(url);
    e.preventDefault();
    });*/

    $(".content-tabs-container").each(function () {
        var $container = $(this);
        $container.find(".content-tabs").not(":eq(0)").hide();
        $(".content-tabs-nav ol li a:eq(0),.pagination li a:not(.prev):eq(0)").addClass("current");

        $container.find(".content-tabs-nav ol li a,.pagination li a:not(.prev,.nxt)").click(function (e) {
            if (!$(this).hasClass("current")) {
                var $links = $(".content-tabs-nav ol li a[href='" + $(this).attr("href") + "'],.pagination li a[href='" + $(this).attr("href") + "']");
                $(".content-tabs-nav ol li a,.pagination li a").removeClass("current");
                $(".content-tabs").hide();
                $links.addClass("current");
                $($container.find(".content-tabs-nav ol li a.current").attr("href")).show();
            }
            e.preventDefault();
        });

        //Disable default action of next and previous links
        $container.find(".pagination li a.prev").click(function (e) {
            var $currentPage = $(".pagination li a.current");
            var $previousLink = $currentPage.parent().prev().find("a");
            if (!$previousLink.hasClass("prev")) {
                $previousLink.click();
            }
            e.preventDefault();
        });

        $container.find(".pagination li a.nxt").click(function (e) {
            var $currentPage = $(".pagination li a.current");
            var $nextLink = $currentPage.parent().next().find("a");
            if (!$nextLink.hasClass("nxt")) {
                $nextLink.click();
            }
            e.preventDefault();
        });

    });





});
//End of Story


