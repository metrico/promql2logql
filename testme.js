const { p2l } = require('./');

var promql = 'rate(foo{bar="baz"}[5m]) by (x,y)'

try {
  var logql = p2l(promql)
  console.log(logql);
} catch(e) {
  console.log(e);
}

var promql_sum = 'sum(rate(foo{bar="baz"}[5m])) by (x,y)'

try {
  var logql = p2l(promql_sum)
  console.log(logql);
} catch(e) {
  console.log(e);
}

//var promql_odd = 'rate(http_requests_total[5m])[30m:1m]'
var promql_odd = 'rate({some="tag", some!="not"}[5m])'

try {
  var logql = p2l(promql_odd)
  console.log(logql);
} catch(e) {
  console.log(e);
}

var promql_noname = 'just_some_name{}'

try {
  var logql = p2l(promql_noname)
  console.log(logql);
} catch(e) {
  console.log(e);
}

var promql_le = '{le="300"}'

try {
  var logql = p2l(promql_le)
  console.log(logql);
} catch(e) {
  console.log(e);
}

var promql_sumrate = 'sum(rate(traces_service_graph_request_failed_total{}[1m]))'

try {
  var logql = p2l(promql_sumrate)
  console.log(logql);
} catch(e) {
  console.log(e);
}

var promql_3way = 'avg(sum by(le) (rate(traces_service_graph_request_failed_total[1m])))'

try {
  var logql = p2l(promql_3way)
  console.log(logql);
} catch(e) {
  console.log(e);
}
