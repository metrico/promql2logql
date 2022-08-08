# prom2logql
PromQL to LogQL Template 

## Usage
```
const p2l = require('promql2logql');
```

## Example
```
rate(foo{"bar"="baz")[5m]) by (x,y)
```

```
rate({"__name__"="foo", "bar"="baz"}[300s]) by (x,y)
```
