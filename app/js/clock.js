console.clear();

let canvas = document.getElementById('clock');
let ctx = canvas.getContext('2d');

ctx.strokeStyle = '#28d1fa';
ctx.fillStyle = '#333';
ctx.lineWidth = 15;

let sunrise = new Date('Sun Oct 18 2015 06:20:31 GMT+0200 (CEST');
let sunset = new Date('Sun Oct 18 2015 17:55:31 GMT+0200 (CEST');

let mrise = moment(sunrise);
let mset = moment(sunset);

console.log(mrise)
console.log((mrise.diff(mset, 'hours')))

const radians = {
  hours: (hour) => hour * (360 / 12),
  minutes: (min) => min * (360 / 60),

};

function degToRad(degree) {
  const factor = Math.PI / 180;
  return degree * factor;
}

function renderTime() {
  let now = new Date();
  let today = now.toDateString();
  let time = now.toLocaleTimeString();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let milliseconds = now.getMilliseconds();
  let newSeconds = seconds * (milliseconds / 1000);

  // Background
  ctx.fillRect(0, 0, 500, 500);

  // Minutes
  ctx.beginPath();
  ctx.arc(250, 250, 200, degToRad(270), degToRad(0));
  ctx.strokeStyle = 'red';
  ctx.stroke();
  ctx.closePath();

  // Hours
  ctx.beginPath();
  ctx.strokeStyle = '#28d1fa';
  ctx.arc(250, 250, 200, degToRad(radians.hours(12)), degToRad((radians.hours(sunset.getHours()))-90));
  ctx.stroke();
  ctx.closePath();

  requestAnimationFrame(renderTime);

  // Date

  // Time
}

  renderTime();

/*
setInterval(() => {
  renderTime();
}, 50);*/
