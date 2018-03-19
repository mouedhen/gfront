document.addEventListener('DOMContentLoaded', function(){
  let splash = document.getElementById('splash');
  let splashTrigger = document.getElementById('splash-up');
  let splashBtnUp = document.getElementById('splash-btn-up');
  let splashBtnDown = document.getElementById('splash-btn-down');

  splash.style.top = '88%';
  console.log(splash.style.top)

  splashTrigger.addEventListener("click", (ev => {
    if (splash.style.top !== '20%') {
      splash.style.top = '20%';
      splashBtnUp.style.display = 'none';
      splashBtnDown.style.display = 'block';
      // splash.style.translateY('-50%');
    } else {
      splash.style.top = '88%';
      splashBtnUp.style.display = 'block';
      splashBtnDown.style.display = 'none';
    }

  }));
}, false);
