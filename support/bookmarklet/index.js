javascript: (function () {
  var colors = [
     '#F5A133', '#33FF57', '#3357FF', '#FF33A1', '#A133FF',
    '#33FFF5', '#FF8C33', '#8C33FF', '#33FF8C',
    '#FF3333', '#33A1FF', '#FF33F5', '#FF5733',
  ];

  var colorMap = JSON.parse(localStorage.getItem('testIdColorMap')) || {};
  var testId = prompt('Enter automation-testid:');

  if (testId) {
    if (!colorMap[testId]) {
      var usedColors = Object.values(colorMap);
      var availableColors = colors.filter(c => !usedColors.includes(c));
      colorMap[testId] = availableColors.length > 0 ? availableColors[0] : colors[Object.keys(colorMap).length % colors.length];
      localStorage.setItem('testIdColorMap', JSON.stringify(colorMap));
    }

    var elems = document.querySelectorAll("[automation-testid='" + testId + "']");
    for (var i = 0; i < elems.length; i++) {
      elems[i].style.outline = `2px solid ${colorMap[testId]}`;
      if (window.getComputedStyle(elems[i]).position === 'static') {
        elems[i].style.position = 'relative';
      }

      var circle = document.createElement('span');
      circle.innerText = i + 1;
      circle.style.position = 'absolute';
      circle.style.top = '0';
      circle.style.right = '0';
      circle.style.backgroundColor = colorMap[testId];
      circle.style.color = 'white';
      circle.style.borderRadius = '50%';
      circle.style.width = '20px';
      circle.style.height = '20px';
      circle.style.display = 'flex';
      circle.style.alignItems = 'center';
      circle.style.justifyContent = 'center';
      circle.style.fontSize = '12px';
      circle.style.zIndex = '10000';
      circle.style.transition = 'transform 0.5s ease-out';
      circle.style.transform = 'scale(0)';
      elems[i].appendChild(circle);

      setTimeout((function (c) {
        return function () {
          c.style.transform = 'scale(1)';
        };
      })(circle), 10);
    }
    console.log(elems);
  }
})();
