<img src="https://user-images.githubusercontent.com/1423657/183499884-6b73c3c8-9385-401c-91f0-222216a47b4e.png" width=200 />

# prom2logql
PromQL to LogQL template based transpiler for [qryn](https://metrico.in)

### Status
* Experimental! Do not use it.

## Usage
```
const { prom2log, prom2labels } = require('@qxip/promql2logql');
const logql = prom2log(promql);
const labels = prom2labels(promql);
```

## Example
Input:
```
rate(foo{"bar"="baz")[5m]) by (x,y)
```
Output:
```
rate({__name__="foo", bar="baz"} | unwrap_value [300s]) by (x,y)
```
