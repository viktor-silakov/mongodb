javascript:(function(){
    var testId = prompt('Введите automation-testid:');
    if(testId){
      var elems = document.querySelectorAll("[automation-testid='" + testId + "']");
      for(var i = 0; i < elems.length; i++){
        elems[i].style.outline = "2px solid purple";
        if(window.getComputedStyle(elems[i]).position === 'static'){
          elems[i].style.position = 'relative';
        }
        var circle = document.createElement('span');
        circle.innerText = i + 1;
        circle.style.position = 'absolute';
        circle.style.top = '0';
        circle.style.right = '0';
        circle.style.backgroundColor = 'purple';
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
        setTimeout((function(c){
          return function(){
            c.style.transform = 'scale(1)';
          };
        })(circle), 10);
      }
      console.log(elems);
    }
  })();
  