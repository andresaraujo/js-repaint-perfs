import 'package:js/js.dart';

@JS("Monitoring")
class MonitoringClass {
  external RenderRate get renderRate;
}

@JS()
@anonymous
abstract class RenderRate {
  external ping();
}

@JS("Monitoring")
external MonitoringClass get Monitoring;