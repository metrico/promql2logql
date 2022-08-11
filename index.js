/*
 * PromQL to LogQL Template Transpiler
 * (C) QXIP BV 2022
 * Released under the AGPLv3 License
 *
 */

const Sqrl = require('squirrelly');
const jsonic = require('jsonic');
const { promql_parse } = require("@qxip/promql-parser-js");

const getOp = function(op){
  const ops = {
    "GreaterEqual":  ">=",
    "LossEqual":  "<=",
    "NotEqual":  "!=",
    "Equal":  "==",
    "GreaterThan":  ">",
    "LessThan":  "<"
  }
  return ops[op] || '=';
}

/*
'{{ @if (tag.op === "GreaterEqual") }}>={{ #elif (tag.op === "LessEqual") }}<={{ #elif (tag.op === "NotEqual") }}!={{ #elif (tag.op === "Equal") }}={{ #elif (tag.op === "GreaterThan") }}>{{ #elif (tag.op === "LessThan") }}<{{ #else }}={{ /if}}`
*/

const convert = function(data){
  if (!data||data.length==0) return;
  try {
	data = jsonic(promql_parse(data));
	var logql = Sqrl.render(getTemplate(data), data)
	return logql;
  } catch(e) {
	console.log(e, data);
	return;
  }
}

const getTemplate = function(data){
  var template = '';
  if (data.range||data.args && data.args[0].args){
    /* double aggregation query */
    template += '{{ it.name }}({{@each(it.args) => it}}'
      template += '{{ it.name }}({{@each(it.args) => arg}}{'
      template += '__name__="{{arg.name}}"'
      template += '{{@if(arg.label_matchers !== null )}}{{@each(arg.label_matchers) => tag}}'
	template += ', {{tag.name}}'
        template += '{{ @if(tag.op == "GreaterEqual") }}>={{ #elif(tag.op == "LessEqual") }}<={{ #elif(tag.op == "NotEqual") }}!={{ #elif(tag.op == "Equal") }}={{ #elif(tag.op === "GreaterThan") }}>{{ #elif(tag.op === "LessThan") }}<{{ #else }}={{ /if}}'
	template += '"{{tag.value}}"{{/each}}{{/if}}} | unwrap_value [{{ arg.range }}]{{/each}})'
    template += '{{/each}})'
    template += '{{@if(it.aggregation !== false)}} by ({{it.aggregation.labels}}){{#else}} by (__name__){{/if}}'
  } else if (data.range||data.args){
    /* range aggregation query */
    template += '{{ it.name }}({{@each(it.args) => arg}}\{ '
      template += '{{@if(arg.name !== "")}}__name__="{{arg.name}}"{{#else}}__name__!=""{{/if}}'
      template += '{{@if(arg.label_matchers !== null )}}{{@each(arg.label_matchers) => tag}}'
      template += ', {{tag.name}}'
	// template += '{{! console.log("!!!!",tag.op) }}'
        template += '{{ @if(tag.op == "GreaterEqual") }}>={{ #elif(tag.op == "LessEqual") }}<={{ #elif(tag.op === "NotEqual") }}!={{ #elif(tag.op == "Equal") }}={{ #elif(tag.op === "GreaterThan") }}>{{ #elif(tag.op === "LessThan") }}<{{ #else }}={{ /if}}'
      template += '"{{tag.value}}"{{/each}}{{/if}}}'
      template += ' | unwrap_value [{{ arg.range }}]'
    template += '{{/each}})'
    template += '{{@if(it.aggregation !== false)}} by ({{it.aggregation.labels}}){{/if}}'
  } else if (!data.name && data.label_matchers[0]){
      template += 'first_over_time({ '
      template += '{{@if(it.label_matchers !== null )}}{{@each(it.label_matchers) => tag}}'
      template += '{{tag.name}}'
        template += '{{ @if(tag.op == "GreaterEqual") }}>={{ #elif(tag.op == "LessEqual") }}<={{ #elif(tag.op === "NotEqual") }}!={{ #elif(tag.op == "Equal") }}={{ #elif(tag.op === "GreaterThan") }}>{{ #elif(tag.op === "LessThan") }}<{{ #else }}={{ /if}}'
      template += '"{{tag.value}}"{{/each}}{{/if}}}'
      template += ' | unwrap_value [1s])'
  } else {
    /* fallback selector */
    console.log(JSON.stringify(data));
    template += 'rate({__name__="{{ it.name }}"} | unwrap_value [1s])'
  }
  return template;
}

module.exports = {
    p2l: convert
};
