System.register(['angular2/core', 'angular2/platform/worker_app'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, worker_app_1;
    var DBRow, App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (worker_app_1_1) {
                worker_app_1 = worker_app_1_1;
            }],
        execute: function() {
            DBRow = (function () {
                function DBRow() {
                }
                DBRow.prototype.trackSample = function (idx, sample) {
                    return idx;
                };
                DBRow = __decorate([
                    core_1.Component({
                        selector: '[db-row]',
                        directives: [],
                        template: "\n   <td class=\"dbname\">\n\t{{db.dbname}}\n  </td>\n  <!-- Sample -->\n  <td class=\"query-count\">\n\t<span [className]=\"db.lastSample.countClassName\">\n              {{db.lastSample.nbQueries}}\n            </span>\n  </td>\n  <!-- Query -->\n  <td *ngFor=\"#q of db.lastSample.topFiveQueries; trackBy:trackSample\" [className]=\"q.elapsedClassName\">\n\t{{q.formatElapsed}}\n\t<div class=\"popover left\">\n\t\t<div class=\"popover-content\">\n\t\t\t{{q.query}}\n\t\t</div>\n\t\t<div class=\"arrow\"></div>\n\t</div>\n  </td>\n\n  ",
                        inputs: ['db'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], DBRow);
                return DBRow;
            }());
            App = (function () {
                function App(bus) {
                    var _this = this;
                    this.databases = [];
                    var pingChannel = bus.initChannel('renderPing');
                    var controlChannel = bus.initChannel('mutationRate');
                    bus
                        .from('mutationRate')
                        .subscribe(function (rate) {
                        ENV.mutations(rate / 100);
                    });
                    var ping = bus.to('renderPing');
                    var load = function () {
                        _this.databases = ENV.generateData(true).toArray();
                        ping.next('ping');
                        setTimeout(load, ENV.timeout);
                        ;
                        ;
                    };
                    load();
                }
                App.prototype.trackDatabase = function (idx, db) {
                    return db.dbname;
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        directives: [DBRow],
                        template: "\n\t  <div>\n\t\t{{testName}}\n\t\t<table class=\"table table-striped latest-data\">\n\t\t\t<tbody>\n\t\t\t<!-- Database -->\n\t\t\t<tr db-row *ngFor=\"#db of databases; trackBy:trackDatabase\" [db]=\"db\"></tr>\n\t\t\t</tbody>\n\t\t</table>\n      </div>\n\n\t",
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof worker_app_1.MessageBus !== 'undefined' && worker_app_1.MessageBus) === 'function' && _a) || Object])
                ], App);
                return App;
                var _a;
            }());
            exports_1("App", App);
        }
    }
});
// var DbComponent = ng.core.
//   Component({
// 	  selector: '[db-row]',
// 	  directives: [],
// 	  templateUrl: 'db-row.html',
// 	  inputs: ['db']
//   })
//   .Class({
// 	  constructor: function DbComponent(){
// 		  console.log('init')
// 	  }
//   })
// var AppComponent = ng.core.
//   Component({
//   }).
//   Class({
//     constructor: function AppComponent() {
//       var me = this;
//       this.databases = [];
// 	  me.trackDatabase = function(idx, db){
// 		  return idx;
// 	  }
//       var load = function() {
//           me.databases = ENV.generateData().toArray();
//           Monitoring.renderRate.ping();
//           setTimeout(load, ENV.timeout);
//       };
//       load();
//     }
//   });
// document.addEventListener('DOMContentLoaded', function() {
//   ng.core.enableProdMode();
//   ng.platform.browser.bootstrap(AppComponent);
// });
