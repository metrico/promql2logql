<img src="https://user-images.githubusercontent.com/1423657/218816262-e0e8d7ad-44d0-4a7d-9497-0d383ed78b83.png" width=200 />


# prom2logql
PromQL to LogQL template based transpiler for [qryn](https://metrico.in)

[![Node.js CI](https://github.com/lmangani/promql2logql/actions/workflows/test.yml/badge.svg)](https://github.com/lmangani/promql2logql/actions/workflows/test.yml)

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
