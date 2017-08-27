import yaml from 'js-yaml';
import Mustache from 'mustache';

import template from './templates/slides.mustache.js';


const generateSlides = (script) => {

  // 1. Convert YAML to JS object
  const doc = yaml.safeLoad(script);

  // 2. Generate slides and return them as HTML
  return Mustache.render(template, doc);
};

export default generateSlides;
