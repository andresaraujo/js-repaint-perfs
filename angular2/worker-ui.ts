import {platform, Provider} from "angular2/core";
import {
  WORKER_RENDER_APP,
  WORKER_RENDER_PLATFORM,
  WORKER_SCRIPT,
  MessageBus
} from "angular2/platform/worker_render";

let appRef = platform([WORKER_RENDER_PLATFORM])
.application([WORKER_RENDER_APP, new Provider(WORKER_SCRIPT, {useValue: "worker-loader.js"})]);


let bus = appRef.injector.get(MessageBus);

bus.initChannel('renderPing');

bus.from('renderPing').subscribe(v => {
//	console.log(v)
  Monitoring.renderRate.ping();
});
