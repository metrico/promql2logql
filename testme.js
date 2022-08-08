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
