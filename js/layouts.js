import db from '../databases/db.js';

const html = document.querySelector('html');
const navBar = document.querySelector('.navbar');
const navItem = navBar.querySelectorAll('.navbar-item');
const portBox = document.querySelector('#port-content');

const aboutBox = document.querySelector('#about');
const skillBox = document.querySelector('#skill');
const certBox = document.querySelector('#certificate');
const projBox = document.querySelector('#project');
const contactBox = document.querySelector('#contact');

const projectBox = projBox.querySelector('ul.project-list');
const projectCatBtn = projBox.querySelectorAll('.project-btn-list > button');
const projectPopup = document.querySelector('.popup');
const projectPopupCloseBtn = projectPopup.querySelector('.exit-btn');
const projectImgSlider = projectPopup.querySelector('.img-slider');

const topBtn = document.querySelector('.top');
const moreBtn = document.querySelector('#more-btn');
const menus = [html, aboutBox, skillBox, certBox, projBox, contactBox];

const animationPositionY = (end, time) => {
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
navItem.forEach((e, i) => e.addEventListener('click', () => handlePositionY(i)));

const handlePositionY = (idx, time = 150) => {
  let top = menus[idx].offsetTop;
  navItem.forEach((e) => e.classList.remove('on'));
  navItem[idx].classList.add('on');
  animationPositionY(top, time);
};

const handleMore = () => {
  portBox.classList.remove('hidden');
  navBar.classList.remove('hidden');
  handlePositionY(1, 100);
};
moreBtn.addEventListener('click', handleMore);

const handleTop = () => {
  handlePositionY(0, 100);
};
topBtn.addEventListener('click', handleTop);

const handleTopVisible = () => {
  scrollY < 400 ? topBtn.classList.add('hidden') : topBtn.classList.remove('hidden');
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
  navItem.forEach((e) => e.classList.remove('on'));
  navItem[handleNavOrder()].classList.add('on');
};
window.addEventListener('scroll', handleScroll);

const handleProjectVisible = (e) => {
  e.addEventListener('click', ({ target }) => {
    projectCatBtn.forEach((e) => e.classList.remove('selected'));
    e.classList.add('selected');

    if (target.value) {
      projectBox.querySelectorAll('li').forEach((e) => e.classList.add('hidden'));
      projectBox.querySelectorAll(`li.is-${target.value}`).forEach((e) => e.classList.remove('hidden'));
    } else {
      projectBox.querySelectorAll('li').forEach((e) => e.classList.remove('hidden'));
    }
  });
};
projectCatBtn.forEach(handleProjectVisible);

const togglePopup = () => {
  projectPopup.querySelector('.pop-body').scrollTop = 0;
  projectPopup.classList.toggle('on');
};
projectPopupCloseBtn.addEventListener('click', togglePopup);

const handleSlider = () => {
  let isDown = false,
    startX,
    scrollLeft;
  projectImgSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - projectImgSlider.offsetLeft;
    scrollLeft = projectImgSlider.scrollLeft;
  });
  projectImgSlider.addEventListener('mouseleave', () => (isDown = false));
  projectImgSlider.addEventListener('mouseup', () => (isDown = false));
  projectImgSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    projectImgSlider.scrollLeft = scrollLeft - e.pageX + projectImgSlider.offsetLeft + startX;
  });
};

const setPopup = (data) => {
  const { title, content, date, stacks, roles, url, gitUrl, demoUrl, demoUrl2, demoUrl3, screenshots } = data;

  projectPopup.querySelector('.pop-title').textContent = title;
  projectPopup.querySelector('.pop-content').textContent = content;
  projectPopup.querySelector('.pop-date').textContent = date;
  projectPopup.querySelector('.skill-box').innerHTML = stacks.reduce(
    (a, b) => a + `<span class="skill-hashtag">${b}</span>`,
    '',
  );
  projectPopup.querySelector('.role-list').innerHTML = roles
    ? roles.reduce((a, b) => a + `<li>${b}</li>`, '')
    : '개인 토이 프로젝트입니다.';
  projectPopup.querySelector('.link-box').innerHTML = `
    ${(url || '') && `<a href="${url}" target="_blank">서비스 바로가기</a>`}
    ${(demoUrl || '') && `<a href="${demoUrl}" target="_blank">데모 바로가기</a>`}
    ${(demoUrl2 || '') && `<a href="${demoUrl2}" target="_blank">데모 바로가기 2</a>`}
    ${(demoUrl3 || '') && `<a href="${demoUrl3}" target="_blank">데모 바로가기 3</a>`}
    ${(gitUrl || '') && `<a href="${gitUrl}" target="_blank">Github 바로가기</a>`}
  `;
  projectImgSlider.innerHTML = screenshots ? screenshots.reduce((a, b) => a + `<img src="${b}" />`, '') : '';
};

const handlePopup = ({ target }) => {
  togglePopup();
  setPopup(db[target.dataset.id]);
};

window.addEventListener('load', () => {
  projectBox.innerHTML = db.reduce(
    (a, b, i) =>
      a +
      `
    <li class="is-${b.type}">
      <figure style="background-image: url(${b.imgUrl});">
        <figcaption>
          <div>
            <h4>${b.title}</h4>
            <button type="button" class="proj-more-btn" data-id="${i}">view more</button>
          </div>
        </figcaption>
      </figure>
    </li>
    `,
    '',
  );
  projectBox.querySelectorAll('.proj-more-btn').forEach((e) => e.addEventListener('click', handlePopup));
  handleSlider();
});
