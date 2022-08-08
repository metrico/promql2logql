const { p2l } = require('./');

var data = {
  "name": "rate",
  "args": [
    {
      "name": "foo",
      "label_matchers": [
        {
          "op": "Equal",
          "name": "bar",
          "value": "baz"
        }
      ],
      "offset": false,
      "range": "300s"
    }
  ],
  "aggregation":{ "action":"By","labels":["x","y"]}
};


try {
  var output = p2l(data)
  console.log(output);
} catch(e) {
  console.log(e);
}
