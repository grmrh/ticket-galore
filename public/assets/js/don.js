
var ticketType = ['hockey', 'football', 'baseball', 'basketball', 'soccer', 'concerts', 'events of all kinds', 'exhibits']
mainPage()
function mainPage() {
    $(document).ready(function () {
        $(".navBarRollDown").slideUp();
        $(".userPreference").on("click", function (event) {
            // Make sure to preventDefault on a submit event.
            event.preventDefault();
            console.log('clicked on preference')
        });

        $(".userLogIn").on("click", function (event) {
            // Make sure to preventDefault on a submit event.
            event.preventDefault();

            $(".navBarRollDown").slideDown();
            $(".slideUpLogIn").slideUp();
            loadAnimatedLeftSideColunm(ticketType)
            window.setTimeout(function () {
                loadAnimatedMiddleSideColunm(ticketType)
            }, 500);
            window.setTimeout(function () {
                loadAnimatedRightSideColunm(ticketType)
            }, 1000);

            $(".LogOutClick").on("click", function (event) {
                event.preventDefault();
                $(".waterFallHeader").slideUp();
                $(".addeClass").slideUp();
                $(".slideUpLogIn").slideDown();

                mainPage()
                
            });
        });
    });
}

function loadAnimatedLeftSideColunm(ticketType) {

    for (var i = 0; i < ticketType.length; i++) {
        console.log(ticketType[1])
        var div = $('<h6 class = "waterFallHeader p-1" >Buy,Sell,Trade</h6><p>' + ticketType[i] + '</p>').prependTo('.waterFallSlideLeft');

        var height = div.outerHeight();
        div.css({
            "marginTop": -height,
            "opacity": 0
        }).animate({
            "marginTop": 0,
            "opacity": 1
        }, "slow");
    };
};

function loadAnimatedMiddleSideColunm(ticketType) {

    for (var i = 0; i < ticketType.length; i++) {
        console.log(ticketType[1])
        var div = $('<h6 class = "waterFallHeader p-1" >Buy,Sell,Trade</h6><p>' + ticketType[i] + '</p>').prependTo('.waterFallSlideMiddle');

        var height = div.outerHeight();
        div.css({
            "marginTop": -height,
            "opacity": 0
        }).animate({
            "marginTop": 0,
            "opacity": 1
        }, "slow");
    };
};

function loadAnimatedRightSideColunm(ticketType) {

    for (var i = 0; i < ticketType.length; i++) {
        console.log(ticketType[1])
        var div = $('<h6 class = "waterFallHeader p-1" >Buy,Sell,Trade</h6><p>' + ticketType[i] + '</p>').prependTo('.waterFallSlideRight');

        var height = div.outerHeight();
        div.css({
            "marginTop": -height,
            "opacity": 0
        }).animate({
            "marginTop": 0,
            "opacity": 1
        }, "slow");
    };
};


//------------------------------------------
//rotating div
var p = 0;

function moveit() {
    p += 0.02;

    var r = 200;
    var xcenter = 200;
    var ycenter = 100;
    var newLeft = Math.floor(xcenter + (r * Math.cos(p)));
    var newTop = Math.floor(ycenter + (r * Math.sin(p)));
    $('#friends').animate({
            top: newTop,
            left: newLeft,
        }, 30, function() {
            moveit()
                });
    $('#friends2').animate({
        top: newTop,
        left: newLeft,
    },60, function() {
        moveit();
    });
 }
$(document).ready(function() {
    moveit();    
});