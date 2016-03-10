System.register(["angular2/core", "angular2/platform/worker_render"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, worker_render_1;
    var appRef, mutationsValue, bus, body, theFirstChild, sliderContainer, slider, text;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (worker_render_1_1) {
                worker_render_1 = worker_render_1_1;
            }],
        execute: function() {
            appRef = core_1.platform([worker_render_1.WORKER_RENDER_PLATFORM])
                .application([worker_render_1.WORKER_RENDER_APP, new core_1.Provider(worker_render_1.WORKER_SCRIPT, { useValue: "worker-loader.js" })]);
            mutationsValue = .5;
            bus = appRef.injector.get(worker_render_1.MessageBus);
            bus.initChannel('renderPing');
            bus.initChannel('mutationRate');
            bus.from('renderPing').subscribe(function (v) {
                //	console.log(v)
                Monitoring.renderRate.ping();
            });
            body = document.querySelector('body');
            theFirstChild = body.firstChild;
            sliderContainer = document.createElement('div');
            sliderContainer.style.cssText = "display: flex";
            slider = document.createElement('input');
            text = document.createElement('label');
            text.innerHTML = 'mutations : ' + (mutationsValue * 100).toFixed(0) + '%';
            text.id = "ratioval";
            slider.setAttribute("type", "range");
            slider.style.cssText = 'margin-bottom: 10px; margin-top: 5px';
            slider.addEventListener('change', function (e) {
                bus.to('mutationRate').next(e.target.valueAsNumber);
                document.querySelector('#ratioval').innerHTML = 'mutations : ' + e.target.valueAsNumber.toFixed(0) + '%';
            });
            sliderContainer.appendChild(text);
            sliderContainer.appendChild(slider);
            body.insertBefore(sliderContainer, theFirstChild);
        }
    }
});
