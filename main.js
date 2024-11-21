var colors = [
  [37, 184, 157],
  [246, 197, 44],
  [21, 60, 120],
  [241, 114, 24],
  [255, 87, 34],
  [76, 175, 80],
  [33, 150, 243],
  [156, 39, 176],
  [255, 235, 59],
  [0, 188, 212]
];
var step = 0;
var colorIndices = [0, 1, 2, 3];
var gradientSpeedPlay = 0.002;
var gradientSpeedPause = 0;
var gradientSpeed = gradientSpeedPause;

var timerElement = document.getElementById('timer');
var timerInterval;
var startTime;
var spacePressed = false;

function updateGradient() {
  if (typeof $ === 'undefined') return;

  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];

  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

  $('#gradient').css({
    background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
  }).css({
    background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
  });

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    // Select two new colors
    colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
  }
}

setInterval(updateGradient, 10);

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    gradientSpeed = gradientSpeedPlay;
    spacePressed = true;
    if (!timerInterval) {
      startTimer();
    }
  }
});

document.addEventListener('keyup', function(event) {
  if (event.code === 'Space') {
    gradientSpeed = gradientSpeedPause;
    spacePressed = false;
    resetTimer();
  }
});

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerElement.textContent = '00:00:00';
}

function updateTimer() {
  var elapsedTime = Date.now() - startTime;
  var hours = Math.floor(elapsedTime / 3600000);
  var minutes = Math.floor((elapsedTime % 3600000) / 60000);
  var seconds = Math.floor((elapsedTime % 60000) / 1000);

  timerElement.textContent =
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds;
}