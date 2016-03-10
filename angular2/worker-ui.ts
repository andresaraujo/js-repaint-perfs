import {platform, Provider} from "angular2/core";
import {Observable} from 'rxjs/Rx'
import {
  WORKER_RENDER_APP,
  WORKER_RENDER_PLATFORM,
  WORKER_SCRIPT,
  MessageBus
} from "angular2/platform/worker_render";

let appRef = platform([WORKER_RENDER_PLATFORM])
.application([WORKER_RENDER_APP, new Provider(WORKER_SCRIPT, {useValue: "worker-loader.js"})]);

let mutationsValue = .5;

let bus = appRef.injector.get(MessageBus);

bus.initChannel('renderPing');
bus.initChannel('mutationRate');

bus.from('renderPing').subscribe(v => {
//	console.log(v)
  Monitoring.renderRate.ping();
});

  var body = document.querySelector('body');
  var theFirstChild = body.firstChild;

  var sliderContainer = document.createElement( 'div' );
  sliderContainer.style.cssText = "display: flex";
  var slider = document.createElement('input');
  var text = document.createElement('label');
  text.innerHTML = 'mutations : ' + (mutationsValue * 100).toFixed(0) + '%';
  text.id = "ratioval";
  slider.setAttribute("type", "range");
  slider.style.cssText = 'margin-bottom: 10px; margin-top: 5px';
  slider.addEventListener('change', function(e) {
	bus.to('mutationRate').next(e.target.valueAsNumber);
    document.querySelector('#ratioval').innerHTML = 'mutations : ' + e.target.valueAsNumber.toFixed(0) + '%';
  });
  sliderContainer.appendChild( text );
  sliderContainer.appendChild( slider );
  body.insertBefore( sliderContainer, theFirstChild );

