var Sqrl = require('squirrelly');

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

const template = '{{ it.name }}({{@each(it.args) => arg}}{"__name__"="{{arg.name}}"{{@if(arg.label_matchers !== null )}}{{@each(arg.label_matchers) => tag}}, "{{tag.name}}"="{{tag.value}}"{{/each}}{{/if}}} | unwrap_value[{{ arg.range }}]{{/each}}){{@if(it.aggregation !== false)}} by ({{it.aggregation.labels}}){{/if}}'

try {
  var output = Sqrl.render(template, data)
  console.log(output);
} catch(e) {
  console.log(e);
}
