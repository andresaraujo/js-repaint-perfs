System.register(["angular2/core", "angular2/platform/worker_app", "./app/app"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, worker_app_1, app_1;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (worker_app_1_1) {
                worker_app_1 = worker_app_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            core_1.platform([worker_app_1.WORKER_APP_PLATFORM])
                .application([worker_app_1.WORKER_APP_APPLICATION])
                .bootstrap(app_1.App);
        }
    }
});
