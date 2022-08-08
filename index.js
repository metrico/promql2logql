/*
 * PromQL to LogQL Template Transpiler
 * (C) QXIP BV 2022
 * Released under the AGPLv3 License
 *
 */

const Sqrl = require('squirrelly');
const jsonic = require('jsonic');
const template = '{{ it.name }}({{@each(it.args) => arg}}{"__name__"="{{arg.name}}"{{@if(arg.label_matchers !== null )}}{{@each(arg.label_matchers) => tag}}, "{{tag.name}}"="{{tag.value}}"{{/each}}{{/if}}} | unwrap_value[{{ arg.range }}]{{/each}}){{@if(it.aggregation !== false)}} by ({{it.aggregation.labels}}){{/if}}'

const convert = function(data){
  if (!data||data.length==0) return;
  try {
	data = jsonic(data);
	var logql = Sqrl.render(template, data)
	return logql;
  } catch(e) {
	console.log(e);
	return;
  }
}
module.exports = convert;
