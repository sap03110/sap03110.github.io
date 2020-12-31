function setPosition(obj) {
    var top = $("#"+obj.target).position().top;
    $("a.navbar-item").removeClass("on");
    $("a.navbar-item:nth-child("+obj.idx+")").addClass("on");
    $('html, body').animate({scrollTop: top}, 600);
}

show_portfolio = () => {
    if (!$("#port-content").is(":visible")) {
        $("html").css("overflow-y","scroll");
        $("#port-content").show();
        $(".navbar.is-fixed-top").css("z-index","30");
    }
}
     
typing = () => {
    if (str_idx<str.length){
        $(".intro").append(str[str_idx]);
        str_idx++; 
    } else { 
        clearInterval(tyInt);
    }
}

var str_idx=0;
var str = "여긴 인삿말 적는 곳이다. 그리고 귀여운 게임을 만들자.";
var tyInt = setInterval(typing,100);
	
$(window).scroll(() => {
    var scroll = $(this).scrollTop();

    if (scroll == 0) {
        $("a.navbar-item").removeClass("on");
        $("a.navbar-item:nth-child(1)").addClass("on");
    }
    else if (scroll < $("#about").position().top) {
        $("a.navbar-item").removeClass("on");
        $("a.navbar-item:nth-child(2)").addClass("on");
    }
    else if ($("#about").position().top <= scroll && scroll < $("#skill").position().top) {
        $("a.navbar-item").removeClass("on");
        $("a.navbar-item:nth-child(3)").addClass("on");
    }
    else if ($("#skill").position().top <= scroll && scroll < $("#project").position().top) {
        $("a.navbar-item").removeClass("on");
        $("a.navbar-item:nth-child(4)").addClass("on");
    }
    else if ($("#project").position().top <= scroll && scroll < $("#contact").position().top) {
        $("a.navbar-item").removeClass("on");
        $("a.navbar-item:nth-child(5)").addClass("on");
    }
});