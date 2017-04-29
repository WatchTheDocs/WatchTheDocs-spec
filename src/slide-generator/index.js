import yaml from 'js-yaml';

/*
 * TODO
 */
const generateSlides = (script) => {

  // 1. Convert YAML to JS object
  const doc = yaml.safeLoad(script);

  // 2. Generate slides and return them as HTML
  const slides = document.createElement('div');
  doc.slides.forEach((item) => {
    const id = Object.keys(item)[0];
    const slide = document.createElement('section');
    slide.textContent = item[id].show[0]; // TODO: More than one!
    slide.setAttribute('data-markdown', '');
    if (item[id].duration) {
      slide.setAttribute('data-autoslide', item[id].duration);
    }
    slides.appendChild(slide);
  });
  // terminal empty slide
  slides.appendChild(document.createElement('section'));

  return slides.innerHTML;
}

export default generateSlides;
