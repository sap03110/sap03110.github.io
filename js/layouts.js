const html = document.querySelector("html");
const navBar = document.querySelector(".navbar");
const navItem = navBar.querySelectorAll(".navbar-item");
const portBox = document.querySelector("#port-content");

const aboutBox = document.querySelector("#about");
const skillBox = document.querySelector("#skill");
const certBox = document.querySelector("#certificate");
const projBox = document.querySelector("#project");
const contactBox = document.querySelector("#contact");

const projectBox = projBox.querySelector("ul.project-list");
const projectCatBtn = projBox.querySelectorAll(".project-btn-list > button");
const projectList = projectBox.querySelectorAll("li");

const topBtn = document.querySelector(".top");
const moreBtn = document.querySelector("#more-btn");
const menus = [html, aboutBox, skillBox, certBox, projBox, contactBox];

const animationPositionY = (end, time = 150) => {
  let scroll = html.scrollTop;
  const isIncrease = scroll < end;
  const offset = Math.abs(end - scroll) / time;
  const ani = setInterval(() => {
    if (isIncrease) {
      scroll += offset;
      html.scrollTop = Math.min(scroll, end);
      scroll >= end && clearInterval(ani);
    } else {
      scroll -= offset;
      html.scrollTop = Math.max(scroll, end);
      scroll <= end && clearInterval(ani);
    }
  });
};
navItem.forEach((e, i) =>
  e.addEventListener("click", () => handlePositionY(i))
);

const handlePositionY = (idx) => {
  let top = menus[idx].offsetTop;
  navItem.forEach((e) => e.classList.remove("on"));
  navItem[idx].classList.add("on");
  animationPositionY(top);
};

const handleMore = () => {
  portBox.classList.remove("hidden");
  navBar.classList.remove("hidden");
  handlePositionY(1, 100);
};
moreBtn.addEventListener("click", handleMore);

const handleTop = () => {
  handlePositionY(0, 100);
};
topBtn.addEventListener("click", handleTop);

const handleTopVisible = () => {
  scrollY < 400
    ? topBtn.classList.add("hidden")
    : topBtn.classList.remove("hidden");
};

const handleNavOrder = () => {
  return scrollY > (contactBox.offsetTop + projBox.offsetTop) / 2
    ? 5
    : scrollY > (projBox.offsetTop + certBox.offsetTop) / 2
    ? 4
    : scrollY > (certBox.offsetTop + skillBox.offsetTop) / 2
    ? 3
    : scrollY > (skillBox.offsetTop + aboutBox.offsetTop) / 2
    ? 2
    : scrollY > aboutBox.offsetTop / 4
    ? 1
    : 0;
};

const handleScroll = () => {
  handleTopVisible();
  navItem.forEach((e) => e.classList.remove("on"));
  navItem[handleNavOrder()].classList.add("on");
};
window.addEventListener("scroll", handleScroll);

const handleProjectVisible = (e) => {
  e.addEventListener("click", ({ target }) => {
    projectCatBtn.forEach((e) => e.classList.remove("selected"));
    e.classList.add("selected");

    if (target.value) {
      projectList.forEach((e) => e.classList.add("hidden"));
      projectBox
        .querySelectorAll(`li.is-${target.value}`)
        .forEach((e) => e.classList.remove("hidden"));
    } else {
      projectList.forEach((e) => e.classList.remove("hidden"));
    }
  });
};
projectCatBtn.forEach(handleProjectVisible);
