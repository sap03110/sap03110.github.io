const setPosition = (obj) => {
    var top = $("#"+obj.target).position().top;
    $("a.navbar-item").removeClass("on");
    $("a.navbar-item:nth-child("+obj.idx+")").addClass("on");
    $('html, body').animate({scrollTop: top}, 600);
}

const show_portfolio = () => {
    if (!$("#port-content").is(":visible")) {
        $("html").css("overflow-y","scroll");
        $("#port-content").show();
        $(".navbar.is-fixed-top").css("z-index","30");
    }
}
     
const typing = () => {
    if (str_idx<str.length){
        $(".intro").append(str[str_idx]);
        str_idx++; 
    } else { 
        clearInterval(tyInt);
    }
}

const topbtn = () => {
    $("html").animate({scrollTop:0}, 400);
}

let str_idx = 0;
let str = "여긴 인삿말 적는 곳이다. 그리고 귀여운 게임을 만들자.";
let tyInt = setInterval(typing, 100);

window.onload = () => {
    topbtn();
}
	
$(window).scroll(() => {
    var scroll = $(this).scrollTop();

    (scroll < 400) ? $(".top").fadeOut() : $(".top").fadeIn();

    if (0 <= scroll && scroll < $("#about").position().top / 4) {
        $("a.navbar-item").removeClass("on");
        $("a.navbar-item:nth-child(1)").addClass("on");
    }
    else if ($("#about").position().top / 4 <= scroll && scroll < ($("#about").position().top + $("#skill").position().top ) / 2) {
        $("a.navbar-item").removeClass("on");
        $("a.navbar-item:nth-child(2)").addClass("on");
    }
    else if (($("#about").position().top+$("#skill").position().top) / 2 <= scroll && scroll < $("#skill").position().top) {
        $("a.navbar-item").removeClass("on");
        $("a.navbar-item:nth-child(3)").addClass("on");
    }
    else if ($("#skill").position().top <= scroll && scroll < $("#certificate").position().top) {
        $("a.navbar-item").removeClass("on");
        $("a.navbar-item:nth-child(4)").addClass("on");
    }
    else if ($("#certificate").position().top <= scroll && scroll < $("#project").position().top) {
        $("a.navbar-item").removeClass("on");
        $("a.navbar-item:nth-child(5)").addClass("on");
    }
    else if ($("#project").position().top <= scroll && scroll < $("#contact").position().top) {
        $("a.navbar-item").removeClass("on");
        $("a.navbar-item:nth-child(6)").addClass("on");
    }
})

const projectBox = document.querySelector('#project ul.project-list')
const projectCatBtn = document.querySelectorAll('.project-btn-list > button')
const projectList = projectBox.querySelectorAll('li')
projectCatBtn.forEach(e => e.addEventListener('click', e2 => {
    projectCatBtn.forEach(e => e.classList.remove('selected'))
    e.classList.add('selected')

    const clsName = e2.target.value
    if (clsName != '') {
        projectList.forEach(e => e.classList.add('hide'))
        projectBox.querySelectorAll(`li.is-${clsName}`).forEach(e => e.classList.remove('hide'))
    } else {
        projectList.forEach(e => e.classList.remove('hide'))
    }
}))