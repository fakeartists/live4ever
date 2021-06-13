/**
.* @author Fabio Toste
.*/
const MotionStats = () => {
  let container = document.createElement('div');
  container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer;z-index:100000;bottom:200px;position:absolute;';

  var msDiv = document.createElement('div');
  msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:rgb(0, 0, 0);';
  container.appendChild(msDiv);

  var msText = document.createElement('div');
  msText.style.cssText =
    'color:rgb(255, 255, 255);font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
  msText.innerHTML = 'Device Motion';
  msDiv.appendChild(msText);

  var msTexts = [];
  var nLines = 4;
  for (var i = 0; i < nLines; i++) {
    msTexts[i] = document.createElement('div');
    msTexts[i].style.cssText =
      'color:rgb(255, 255, 255);background-color:rgb(0, 0, 0);font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
    msDiv.appendChild(msTexts[i]);
    msTexts[i].innerHTML = '-';
  }

  var lastTime = Date.now();
  return {
    domElement: container,

    update: deviceMotion => {
      if (!deviceMotion) return;
      if (Date.now() - lastTime < 1000 / 30) return;
      lastTime = Date.now();

      let elr = deviceMotion.getScreenAdjustedEuler();

      let i = 0;
      msTexts[i++].textContent = '=== Euler ===';
      msTexts[i++].textContent = 'Alpha: ' + Math.round(elr.alpha * 100) / 100;
      msTexts[i++].textContent = 'Beta: ' + Math.round(elr.beta * 100) / 100;
      msTexts[i++].textContent = 'Gamma: ' + Math.round(elr.gamma * 100) / 100;
    }
  };
};

export default MotionStats;
