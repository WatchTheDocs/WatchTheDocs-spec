import head from 'headjs';
import Reveal from 'reveal.js';
import load from './script-loader';
import generateSlides from '../slide-generator';

export const initialize = async (init_obj) => {
  // 1. Get DOM elements
  const scriptTag = document.querySelector('script[type="text/yaml"]');
  const slidesTag = document.querySelector('.reveal .slides');

  // 2. Generate HTML slides from script tag
  //    and place them into slides tag
  const script = await load(scriptTag);
  slidesTag.innerHTML = generateSlides(script);

  // 3. Initialise RevealJS
  Reveal.initialize(init_obj);
}
