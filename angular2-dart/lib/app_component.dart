import 'package:angular2/angular2.dart';
import 'dart:async';

import 'env_interop.dart';
import 'monitoring_interop.dart';

@Component(
    selector: 'my-app',
    template: '''
<div>
    <table class="table table-striped latest-data">
        <tbody>
        <tr db-row *ngFor="#db of databases; trackBy:trackDatabase" [db]="db"></tr>
        </tbody>
    </table>
</div>
    ''',
    directives: const [DBRow])
class AppComponent {
  List<DataModel> databases = [];

  AppComponent() {
    var timer = new Timer.periodic(new Duration(seconds: ENV.timeout), load);
  }

  load(_) {
    databases = ENV.generateData(true).toArray();
    Monitoring.renderRate.ping();
  }

  String trackDatabase(idx, db) {
    return db.dbname;
  }
}

@Component(
    selector: '[db-row]',
    template: '''
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
    ''',
    inputs: const ['db'])
class DBRow {
  DataModel db;

  trackSample(idx, sample) {
    return idx;
  }
}
