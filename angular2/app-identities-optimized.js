var AppComponent = ng.core.
  Component({
    selector: 'my-app',
    directives: [],
    templateUrl: 'app-component.html'
  }).
  Class({
    constructor: function AppComponent() {
      var me = this;
      this.databases = [];
      var load = function() {
          me.databases = ENV.generateData(true).toArray();
          Monitoring.renderRate.ping();
          setTimeout(load, ENV.timeout);
      };
      load();
    }
  });

document.addEventListener('DOMContentLoaded', function() {
  ng.core.enableProdMode();
  ng.platform.browser.bootstrap(AppComponent);
});
