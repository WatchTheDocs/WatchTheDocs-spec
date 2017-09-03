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
 *
 * This method is used when audio is not available.
 * Otherwise TTS-generated speech marks are used instead.
 */
const generateSpeechMarks = (listOfStrings, totalDuration) => {
  const vowels = /[aouie]/i;
  const punctuation = /(\s*[.,;:()!?]\s*)+/ig;
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

  /*
   * Returns `true` if the slide is fragmented
   * (most commonly fragments are different parts of subtitles)
   */
  const isFragmented = (context) => (
    !!context.duration
    && Array.isArray(context.say)
    && context.say.length > 1
  );

  /*
   * Lambda for determining whether to add `data-autoslide` attribute
   * to the section or not.
   */
  const renderAutoSlide = function() { return !!this.duration && !isFragmented(this); };

  /*
   * Lambda for rendering `data-audio` attribute used for starting
   * to play audio at a given time mark.
   */
  const renderAudio = function() {
    // TODO
    return false;
  };

  /*
   * Lambda for rendering "Say" blocks
   */
  const renderSay = function() {
    // If nothing to say and no audio, don't render anything
    if (!this.say || this.say.length === 0) {
      return function (template, render) { return render(''); };
    }

    // Prepare variables
    let context;
    const say = this.say.slice();
    let duration = this.duration;

    // If there is audio, use it for timing what to say
    // TODO

    // If we still have something to say, then auto-generate speech marks
    if (isFragmented(this)) {
      context = generateSpeechMarks(say, duration).map(v => ({ text: v[0], duration: v[1] }));
    } else {
      context = (Array.isArray(this.say) ? this.say : [this.say]).map(text => ({ text, duration: false }));
    }
    return function (template, render) {
      const text = context.map(item => Mustache.render(template, item)).join('');
      return render(text);
    };
  };

  // 1. Convert YAML to JS object
  const doc = Object.assign(
    {},
    yaml.safeLoad(script),
    { renderAutoSlide, renderSay, renderAudio }
  );

  // 2. Generate slides and return them as HTML
  return Mustache.render(template, doc);
};

export default generateSlides;
