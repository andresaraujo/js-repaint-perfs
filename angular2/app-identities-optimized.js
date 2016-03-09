var logged = 0;
var DbQuery = ng.core.
  Component({
    selector: '[db-query]',
    templateUrl: 'db-query.html',
	inputs: ['query'],
	
  })
  .Class({
	  constructor: function DbQuery(){}
  })


var DbComponent = ng.core.
  Component({
	  selector: '[db-row]',
	  directives: [DbQuery],
	  templateUrl: 'db-row.html',
	  inputs: ['db'],
	  changeDetection: ng.core.ChangeDetectionStrategy.OnPush
  })
  .Class({
	  constructor: function DbComponent(){
		  var me = this;
	  },
	  trackSample: function(idx, sample){
			  
		    return idx;
	      }
  })

var AppComponent = ng.core.
  Component({
    selector: 'my-app',
    directives: [DbComponent],
    templateUrl: 'app-component.html'
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
