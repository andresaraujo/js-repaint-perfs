import {Component, ChangeDetectionStrategy} from 'angular2/core'
import {MessageBus} from 'angular2/platform/worker_app'

@Component({
  selector: '[db-row]',
  directives: [],
  template: `
   <td class="dbname">
	{{db.dbname}}
  </td>
  <!-- Sample -->
  <td class="query-count">
	<span [className]="db.lastSample.countClassName">
              {{db.lastSample.nbQueries}}
            </span>
  </td>
  <!-- Query -->
  <td *ngFor="#q of db.lastSample.topFiveQueries; trackBy:trackSample" [className]="q.elapsedClassName">
	{{q.formatElapsed}}
	<div class="popover left">
		<div class="popover-content">
			{{q.query}}
		</div>
		<div class="arrow"></div>
	</div>
  </td>

  `,
  inputs: ['db'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
class DBRow {
	trackSample(idx, sample){
		return idx;
	}
}


@Component({
	selector: 'my-app',
    directives: [DBRow],
    template: `
	  <div>
		{{testName}}
		<table class="table table-striped latest-data">
			<tbody>
			<!-- Database -->
			<tr db-row *ngFor="#db of databases; trackBy:trackDatabase" [db]="db"></tr>
			</tbody>
		</table>
      </div>

	`,
	//changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
	databases = [];
	constructor(bus:MessageBus){
		let pingChannel = bus.initChannel('renderPing');
		let controlChannel = bus.initChannel('mutationRate');
		bus
		  .from('mutationRate')
		  .subscribe(rate => {
			ENV.mutations(rate / 100);
		});
		
		let ping = bus.to('renderPing');
		
		const load = () =>  {
          this.databases = ENV.generateData(true).toArray();
          ping.next('ping');
          setTimeout(load, ENV.timeout);;;
       };
      load();
	}
	trackDatabase(idx, db){
		return db.dbname;
	}
}



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
