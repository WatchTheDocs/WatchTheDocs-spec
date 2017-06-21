import yaml from 'js-yaml';
import Mustache from 'mustache';

import template from './templates/slides.mustache.js';

/*
 * Returns array of [string, duration] pairs based on number
 * of vowels and punctuation symbols in each of
 * the strings.
 *  
 *   * Each vowel is counted as a single interval
 *   * Each sequence of punctuation symbols.
 *     such as "!" or ")," or "..." is counted
 *     as two intervals.
 *   * Duration of each string is normalized by intervals
 *     to make up the totalLength.
 */
const balanceWords = (listOfStrings, totalDuration) => {
  const vowels = /[aouie]/i;
  const punctuation = /(\s*[.,;:()!?]\s*)+/i;
  const intervals = listOfStrings.map(s => (
    s.match(vowels).length +
    2 * s.match(punctuation).length 
  ));
  const totalIntervals = intervals.reduce((a, b) => a + b, 0);
  const durations = intervals.map(s => Math.round(s * totalDuration / totalIntervals));
  const sumDuration = durations.reduce((a, b) => a + b, 0);
  return [
    ...durations.slice(0, -1),
    ...durations.slice(-1).map(v => v + totalDuration - sumDuration)
  ].map((d, i) => [listOfStrings[i], d]);
};


/*
 * Generates HTML slides from the Yaml template
 */
const generateSlides = (script) => {

  const isFragmented = (context) => (
    !!context.duration
    && Array.isArray(context.say)
    && context.say.length > 1
  );

  const renderAutoSlide = function() { return isFragmented(this); };
  const renderSay = function() {
    let context;
    if (isFragmented(this)) {
      context = balanceWords(this.say, this.duration).map(v => ({ text: v[0], duration: v[1] }));
    } else {
      context = (Array.isArray(this.say) ? this.say : [this.say]).map(text => ({ text }));
    }
    return (function(template, render) { return render(template); }).bind(context);
  };

  // 1. Convert YAML to JS object
  const doc = Object.assign(
    {},
    yaml.safeLoad(script),
    { renderAutoSlide, renderSay }
  );

  // 2. Generate slides and return them as HTML
  return Mustache.render(template, doc);
};

export default generateSlides;
