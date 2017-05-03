//import head from 'headjs';
import load from './script-loader';
import generateSlides from '../slide-generator';

export const getTags = (doc) => {
  const scriptTag = doc.querySelector('script[type="text/yaml"]');
  const slidesTag = doc.querySelector('.reveal .slides');
  if (!scriptTag) {
    throw new Error([
      'Could not find WatchTheDocs script in the document.',
      'Please, add it inside the <head> or <body> tag:',
      '<script type="text/yaml"> ... </script>'
    ].join('\n'));
  }
  if (!slidesTag) {
    throw new Error([
      'Could not find "slides" div.',
      'Please add the following structure inside the <body> tag:',
      '<div class="reveal">div class="slides"></div></div>'
    ].join('\n'));
  }
  return { scriptTag, slidesTag };
}

export const initialize = async (init_obj) => {
  // 1. Get DOM elements
  const { scriptTag, slidesTag } = getTags(document);

  // 2. Generate HTML slides from script tag
  //    and place them into slides tag
  const script = await load(scriptTag);
  slidesTag.innerHTML = generateSlides(script);

  // 3. Initialise RevealJS
  const Reveal = require('reveal.js');
  Reveal.initialize(init_obj);
}
