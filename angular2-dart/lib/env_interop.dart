import 'package:js/js.dart';


@JS("ENV")
class Env {
  external get timeout;
  external GenerateData generateData(bool keepIdentity);
}

@JS()
@anonymous
abstract class GenerateData {
  external List<DataModel> toArray();
}

@JS()
@anonymous
abstract class DataModel {
  external get dbname;
  external get query;
  external get formatElapsed;
  external get elapsedClassName;
  external LastSampleModel get lastSample;
}

@JS()
@anonymous
abstract class LastSampleModel {
  external get countClassName;
  external get nbQueries;
  external List<QueryModel> get topFiveQueries;
}

@JS()
@anonymous
abstract class QueryModel {
  external get elapsedClassName;
  external get formatElapsed;
  external get query;
}

@JS("ENV")
external Env get ENV;