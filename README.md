# prom2logql
PromQL to LogQL template based transpiler for [qryn](https://metrico.in)

### Status
* Experimental! Do not use it.

## Usage
```
const p2l = require('promql2logql');
var logql = p2l(promql);
```

## Example
Input:
```
rate(foo{"bar"="baz")[5m]) by (x,y)
```
Output:
```
rate({"__name__"="foo", "bar"="baz"} | unwrap_value [300s]) by (x,y)
```
