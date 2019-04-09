$(function () {
    var $htmlBody = $('html, body'),
        $body = $('body'),
        $burger = $('.js-burger'),
        $menu = $('.js-header-menu'),
        $menuLink = $('.js-menu-link'),
        $partakerMore = $('.js-partaker-more'),
        $timeline = $('.js-timeline'),
        url = window.location,
        cleanUrl = url.toString().substring(0, url.toString().lastIndexOf("/") + 1), // .replace("file:///", "")
        timeLineTimer = 0;

    $burger.on('click', function (e) {
        e.preventDefault();
        var $this = $(this).find('.header__burger-box');

        if ($this.hasClass('header__burger--open')) {
            $this.removeClass('header__burger--open');
            $menu.removeClass('header__drop--active');
            $body.removeClass('scroll-prevent');
        } else {
            $this.addClass('header__burger--open');
            $menu.addClass('header__drop--active');
            $body.addClass('scroll-prevent');
        }
    });

    $partakerMore.on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            $block = $this.parent();

        $block.prev().removeClass('partaker__list--short');
        $block.remove();
    });

    $menuLink.on('click', function () {
        var linkToScroll = $(this).data('link');
        $body.removeClass('scroll-prevent');
        $burger.find('.header__burger-box').removeClass('header__burger--open');
        $menu.removeClass('header__drop--active');
        $htmlBody.animate({
            scrollTop: $('#' + linkToScroll).offset().top
        }, 1000);
    });

    if ($timeline.length) {
        $timeline.verticalTimeline({
            animate: 'slide',
            arrows: false
        });

        // check which floor has shop
        timeLineTimer = setInterval( checkFloorNumber, 500);
    }

    function checkFloorNumber() {
        if ($timeline.hasClass('vtimeline')) {
            clearInterval(timeLineTimer);

            // set other color for item
            if ($timeline.find('.vtimeline-block').hasClass('vtimeline-right')) {
                $timeline.find('.vtimeline-right').each(function () {
                    $(this).prev().addClass('vtimeline-icon--right');
                });
            }

            // checks open content
            $timeline.find('.vtimeline-block').each(function () {
                var $this = $(this);
                if ($this.find('.vtimeline-desc').length) {
                    $this.addClass('vtimeline-block--content');
                }

            });

            timeLineToggleContent();
        }
    }

    function timeLineToggleContent() {
        $('.js-timeline-link').on('click', function () {
            $(this).toggleClass('vtimeline-link--open')
                .parent()
                .find('.vtimeline-desc')
                .toggleClass('vtimeline-desc--hidden')
                .parent()
                .toggleClass('vtimeline-content--active');
        });
    }





    /* youtube video preload */
    var $mainVideo = $(".js-main-video"),
        $reviewVideo = $(".js-review-video"),
        $video = $(".js-video");

    setYoutubeMainVideo();
    function setYoutubeMainVideo() {
        $mainVideo.append($('<div><img src="' + cleanUrl + 'assets/img/video/poster-0.png"><div class="play"></div></div>'));
        $reviewVideo.append($('<div><img src="' + cleanUrl + 'assets/img/video/review2017.png"><div class="play"></div></div>'));

        $mainVideo.on('click', function () {
            setYoutubeIframe($mainVideo, $mainVideo.attr('data-id'));
        });

        $reviewVideo.on('click', function () {
            setYoutubeIframe($reviewVideo, $reviewVideo.attr('data-id'));
        });
    }

    $video.each(function (i) {
        $this = $(this);
        i++;
        var $videoDiv = $('<div><img src="' + cleanUrl + 'assets/img/video/poster-' + i + '.png"><div class="play"></div></div>');
        $this.append($videoDiv);
    });

    $video.on('click', function () {
        var $this = $(this),
            $videoImg = $this.find('img');
        $this.attr('data-main',$mainVideo.attr('data-id'));

        if ($mainVideo.attr('data-img')){
            $videoImg.attr('data-copy',$mainVideo.attr('data-img'));
        } else {
            $videoImg.attr('data-copy',$mainVideo.find('img').attr('src'));
        }

        $mainVideo.attr('data-img', $videoImg.attr('src'));
        $mainVideo.attr('data-id', $this.attr('data-id'));
        $this.attr('data-id',$this.attr('data-main')).removeAttr('data-main');
        $videoImg.attr('src',$videoImg.attr('data-copy')).removeAttr('data-copy');

        setYoutubeIframe($mainVideo, $mainVideo.attr('data-id'));
    });

    function setYoutubeIframe($item, id) {
        var $iframe =  $('<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1" allowfullscreen="1" frameborder="0"></iframe>');
        $item.empty().append($iframe);
    }
});