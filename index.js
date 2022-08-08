/*
 * PromQL to LogQL Template Transpiler
 * (C) QXIP BV 2022
 * Released under the AGPLv3 License
 *
 */

const Sqrl = require('squirrelly');
const jsonic = require('jsonic');

const convert = function(data){
  if (!data||data.length==0) return;
  try {
	data = jsonic(data);
	var logql = Sqrl.render(getTemplate(data), data)
	return logql;
  } catch(e) {
	console.log(e);
	return;
  }
}

const getTemplate = function(data){
  var template = '';
  if (data.range||date.args){ 
    /* range aggregation query */
    template += '{{ it.name }}({{@each(it.args) => arg}}{"__name__"="{{arg.name}}"{{@if(arg.label_matchers !== null )}}{{@each(arg.label_matchers) => tag}}, "{{tag.name}}"="{{tag.value}}"{{/each}}{{/if}}}[{{ arg.range }}]{{/each}}){{@if(it.aggregation !== false)}} by ({{it.aggregation.labels}}){{/if}}'
  } else {
    /* fallback selector */
    template += '{"__name__":"{{ it.name }}"}'
  }
  return template;
}

module.exports = {
    p2l: convert
};
