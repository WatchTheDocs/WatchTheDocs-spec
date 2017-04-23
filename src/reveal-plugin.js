import Reveal from 'reveal.js';
import yaml from 'js-yaml';
import 'whatwg-fetch';

const load = (script_tag) => {
  // Make sure type is "text/yaml"
  if (script_tag.getAttribute('type') !== 'text/yaml') {
    throw new Error('WatchTheDocs script has wrong MIME type. Must be "text/yaml".');
  }

  // Return text if "src" attribute is not specified
  const src = script_tag.getAttribute('src');
  if (!src) {
    return script_tag.text;
  }

  // If we have "src" then load it
  return fetch(src).then(response => response.text());
}

export const init = async (script_id, voiceover_id) => {
  // 1. Load the script
  const script_tag = document.getElementById(script_id);
  const script = await load(script_tag);
  console.log(script);

  // 2. Convert YAML to JS object
  const doc = yaml.safeLoad(script);

  // 3. Generate slides and add them to "reveal"
  const slides = document.querySelector('.reveal .slides');
  slides.innerHTML = '';
  doc.slides.forEach((item) => {
    const md = Object.keys(item)[0];
    const slide = document.createElement('section');
    console.log(md);
    slide.textContent = md;
    slide.setAttribute('data-markdown', '');
    if (item[md].duration) {
      slide.setAttribute('data-autoslide', item[md].duration);
    }
    slides.appendChild(slide);
  });
  // terminal empty slide
  slides.appendChild(document.createElement('section'));

  console.log('WTD Loaded!');
}

export default init;
