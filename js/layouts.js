const navBar = document.querySelector('.navbar.is-fixed-top')
const portCont = document.querySelector('#port-content')

const projectBox = document.querySelector('#project ul.project-list')
const projectCatBtn = document.querySelectorAll('.project-btn-list > button')
const projectList = projectBox.querySelectorAll('li')

const setPosition = obj => {
    let top = $(`#${obj.target}`).position().top;
    $("a.navbar-item").removeClass("on");
    $("a.navbar-item:nth-child("+obj.idx+")").addClass("on");
    $('html, body').animate({scrollTop: top}, 600);
}

const show_portfolio = () => {
    if (portCont.style.display === '') {
        portCont.style.display = 'block'
        navBar.style['z-index'] = 30
    }
}

const topBtn = document.querySelector('.top')
const goToTop = () => {
    $("html").animate({scrollTop:0}, 400);
}
topBtn.addEventListener('click', goToTop)

let str_idx = 0;

window.onload = goToTop
window.onscroll = () => {
    let scroll = $(this).scrollTop()
    scroll < 400 ? $(".top").fadeOut() : $(".top").fadeIn()

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

}

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