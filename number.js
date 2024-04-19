const { format } = new Intl.NumberFormat("ru");
const framesPerSecond = 60;
const animationTimeSeconds = 1;
const partOf = 60 / (animationTimeSeconds * 1000);


function numberGrowAnimation(el) {
  const elText = el.textContent.replace(/\s/g, '');
  const num = parseInt(elText);
  const sign = elText.match(/\D/)[0];
  const step = num * partOf;
  let current = 0;
  const interval = setInterval(() => {
    current += step;
    el.textContent = format(Math.floor(current)) + sign;
    if (current >= num) {
      el.textContent = format(num) + sign;
      clearInterval(interval);
    }
  }, animationTimeSeconds * 1000 * partOf);
}
setAnimation();

function setAnimation() {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[number-animation]').forEach(el => {
      numberGrowAnimation(el);
    });
  });
}