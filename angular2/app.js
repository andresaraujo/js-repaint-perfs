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
    },
	trackDatabase : function(idx, db){
		  return db.dbname;
	}

  });

document.addEventListener('DOMContentLoaded', function() {
  ng.core.enableProdMode();
  ng.platform.browser.bootstrap(AppComponent);
});
