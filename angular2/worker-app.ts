import {platform, provide, enableProdMode} from "angular2/core";
import {
  WORKER_APP_PLATFORM,
  WORKER_APP_APPLICATION,
  MessageBus
} from "angular2/platform/worker_app";

import {App} from "./app/app";

enableProdMode()

platform([WORKER_APP_PLATFORM])
.application([WORKER_APP_APPLICATION])
.bootstrap(App);
