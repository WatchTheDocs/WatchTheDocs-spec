import generateSlides from './slide-generator';
import dedent from 'dedent';
import { customJasmineMatchers } from '../test-utils';


describe('RevealJS Slide Generator', () => {

  beforeEach(() => { jasmine.addMatchers(customJasmineMatchers); });

  it('generates a single terminal slide from the empty slides', () => {
    const yaml = dedent`
      ---
      slides:
      `;
    const html = `<section></section>`;
    const result = generateSlides(yaml).trim();
    expect(result).toEqualHtml(html);
  });

  it('generates HTML for a single slide', () => {
    const yaml = dedent`
      ---
      slides:
        -
          show: "Hello, World!"
      `;
    const html = dedent`
      <section data-markdown>
        Hello, World!
      </section>
      <section></section>`;
    const result = generateSlides(yaml).trim();
    expect(result).toEqualHtml(html);
  });

});
