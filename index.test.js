const { p2l, prom2labels } = require('./index.js');

test('rate groupby', () => {
  var promql = 'rate(foo{bar="baz"}[5m]) by (x,y)'
  var result = 'rate({ __name__=\"foo\", bar=\"baz\"} | unwrap_value [300s]) by (x,y)'
  var logql = p2l(promql)
  expect(logql).toBe(result)
});

test('sum rate groupby', () => {
  var promql = 'sum(rate(foo{bar="baz"}[5m])) by (x,y)'
  var result = 'sum(rate({__name__="foo", bar="baz"} | unwrap_value [300s])) by (x,y)'
  var logql = p2l(promql)
  expect(logql).toBe(result)
});

test('rate not', () => {
  var promql = 'rate({some="tag", some!="not"}[5m])'
  var result = 'rate({ __name__!="", some="tag", some!="not"} | unwrap_value [300s])'
  var logql = p2l(promql)
  expect(logql).toBe(result)
});

test('basic', () => {
  var promql = 'just_some_name{}'
  var result = 'rate({__name__="just_some_name"} | unwrap_value [1m])'
  var logql = p2l(promql)
  expect(logql).toBe(result)
});

test('le 300', () => {
  var promql = '{le="300"}'
  var result = 'first_over_time({__name__=~".*"le, ="300"} | unwrap_value [1m])'
  var logql = p2l(promql)
  expect(logql).toBe(result)
});

test('sum rate func', () => {
  var promql = 'sum(rate(traces_service_graph_request_failed_total{}[1m]))'
  var result = 'sum(rate({__name__="traces_service_graph_request_failed_total"} | unwrap_value [60s])) by (__name__)'
  var logql = p2l(promql)
  expect(logql).toBe(result)
});

test('avg sum groupby', () => {
  var promql = 'avg(sum by(le) (rate(traces_service_graph_request_failed_total[1m])))'
  var result = 'avg(sum(rate({__name__="traces_service_graph_request_failed_total"} | unwrap_value [60s]))) by (__name__)'
  var logql = p2l(promql)
  expect(logql).toBe(result)
});

test('avg sum', () => {
  var promql = 'avg(sum by(le) (rate(traces_service_graph_request_failed_total[1m])))'
  var result = 'avg(sum(rate({__name__=\"traces_service_graph_request_failed_total\"} | unwrap_value [60s]))) by (__name__)'
  var logql = p2l(promql)
  expect(logql).toBe(result)
});

test('histogram', () => {
  var promql = 'histogram_quantile(0.95, sum(rate(traces_service_graph_request_server_seconds_bucket{}[1m])) by (le))'
  var result = 'quantile_over_time(0.95, sum(rate({__name__="traces_service_graph_request_server_seconds_bucket"} | unwrap_value [60s])) by (le))'
  var logql = p2l(promql)
  expect(logql).toBe(result)
});

test('first_over_time', () => {
  var promql = 'something{le="300"}'
  var result = 'first_over_time({__name__="something", le="300"} | unwrap_value [1m])'
  var logql = p2l(promql)
  expect(logql).toBe(result)
});

test('labels: simple', () => {
  var promql = 'something'
  var result = '{__name__="something"}'
  var logql = prom2labels(promql)
  expect(logql).toBe(result)
});

test('labels: any with tags', () => {
  var promql = '{le="300", funk="ytown"}'
  var result = '{__name__=~".*", le="300", funk="ytown"}'
  var logql = prom2labels(promql)
  expect(logql).toBe(result)
});

/* Failing */


/* Dummy Ending */

test('test', () => {
  var test = 'x'
  var result = 'x'
  expect(test).toBe(result)
});
