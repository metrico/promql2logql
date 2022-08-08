# prom2logql
PromQL to LogQL template based transpiler

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
rate({"__name__"="foo", "bar"="baz"}[300s]) by (x,y)
```
