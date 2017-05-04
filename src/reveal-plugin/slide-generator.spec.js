import generateSlides from './slide-generator';
import dedent from 'dedent';
import { customJasmineMatchers } from '../test-utils';


describe('RevealJS Slide Generator generates', () => {

  const check = ({yaml, html}) => {
    const result = generateSlides(dedent(yaml)).trim();
    expect(result).toEqualHtml(dedent(html));
  }

  beforeEach(() => { jasmine.addMatchers(customJasmineMatchers); });

  it('a single terminal slide from the empty slides', () => check({
    yaml: `
      ---
      slides:
    `,
    html: `<section></section>`
  }));

  it('a single slide', () => check({
    yaml: `
      ---
      slides:
        -
          show: "Hello, World!"
    `,
    html: `
      <section data-markdown>
        Hello, World!
      </section>
      <section></section>`
  }));

  it('a slide with a single shot of subtitles', () => check({
    yaml: `
      ---
      slides:
        -
          show: "This slide has subtitles."
          say:
            - "This slide is full of subtitles..."
    `,
    html:`
      <section data-markdown>
        This slide has subtitles.
        <footer class="audio-notes">
          This slide is full of subtitles...
        </footer>
      </section>
      <section></section>
    `
  }));

  it('a slide with a single shot of subtitles when "say:" is a string', () => check({
    yaml: `
      ---
      slides:
        -
          show: "This slide has subtitles."
          say: "This slide is full of subtitles..."
    `,
    html:`
      <section data-markdown>
        This slide has subtitles.
        <footer class="audio-notes">
          This slide is full of subtitles...
        </footer>
      </section>
      <section></section>
    `
  }));

  it('a slide with a multiple subtitles', () => check({
    yaml: `
      ---
      slides:
        -
          show: "This slide has subtitles."
          say:
            - "Hello, and welcome to WatchTheDocs!"
            - "This slide is full of subtitles..."
            - "See you on the next slide, bye!"
    `,
    html:`
      <section data-markdown>
        This slide has subtitles.
        <footer class="audio-notes"> Hello, and welcome to WatchTheDocs! </footer>
        <footer class="audio-notes"> This slide is full of subtitles... </footer>
        <footer class="audio-notes"> See you on the next slide, bye! </footer>
      </section>
      <section></section>
    `
  }));

});
