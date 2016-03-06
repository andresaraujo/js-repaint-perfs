var DbComponent = ng.core.
  Component({
	  selector: '[db-row]',
	  directives: [],
	  templateUrl: 'db-row.html',
	  inputs: ['db']
  })
  .Class({
	  constructor: function DbComponent(){
		  console.log('init')
	  }
  })



var AppComponent = ng.core.
  Component({
    selector: 'my-app',
    directives: [DbComponent],
    templateUrl: 'app-component.html',
	//changeDetection: ng.core.ChangeDetectionStrategy.OnPush
  }).
  Class({
    constructor: function AppComponent() {
      var me = this;
      this.databases = [];

	  me.trackDatabase = function(idx, db){
		  return db.dbname;
	  }

      var load = function() {
          me.databases = ENV.generateData().toArray();
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
