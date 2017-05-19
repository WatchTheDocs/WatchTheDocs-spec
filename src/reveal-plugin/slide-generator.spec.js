import generateSlides from './slide-generator';
import dedent from 'dedent';
import { customJasmineMatchers } from '../test-utils';


describe('Simplest cases: RevealJS Slide Generator generates', () => {

  const check = ({yaml, html}) => {
    const result = generateSlides(dedent(yaml)).trim();
    expect(result).toEqualHtml(dedent(html));
  };

  beforeEach(() => { jasmine.addMatchers(customJasmineMatchers); });

  it('a single terminal slide from the empty slides', () => check({
    yaml: `
      ---
      slides:
    `,
    html: '<section></section>'
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

  it('a slide with multiple subtitles', () => check({
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

  it('two slides with multiple subtitles', () => check({
    yaml: `
      ---
      slides:
        -
          show: "This slide has subtitles."
          say:
            - "Hello, and welcome to WatchTheDocs!"
            - "This slide is full of subtitles..."
            - "See you on the next slide, bye!"
        -
          show: "2nd slide goes here."
          say:
            - "This is the 2nd slide."
            - "It also has plenty of subtitles!"
    `,
    html:`
      <section data-markdown>
        This slide has subtitles.
        <footer class="audio-notes"> Hello, and welcome to WatchTheDocs! </footer>
        <footer class="audio-notes"> This slide is full of subtitles... </footer>
        <footer class="audio-notes"> See you on the next slide, bye! </footer>
      </section>
      <section data-markdown>
        2nd slide goes here.
        <footer class="audio-notes"> This is the 2nd slide. </footer>
        <footer class="audio-notes"> It also has plenty of subtitles! </footer>
      </section>
      <section></section>
    `
  }));

});


describe('RevealJS Slide Generator generates slides with duration:', () => {

  const check = ({yaml, html}) => {
    const result = generateSlides(dedent(yaml)).trim();
    expect(result).toEqualHtml(dedent(html));
  };

  beforeEach(() => { jasmine.addMatchers(customJasmineMatchers); });

  it('a single 10 sec slide', () => check({
    yaml: `
      ---
      slides:
        -
          duration: 10000
          show: "Hello, World!"
    `,
    html: `
      <section data-markdown data-autoslide="10000">
        Hello, World!
      </section>
      <section></section>`
  }));

  it('a 5 sec slide with a single shot of subtitles', () => check({
    yaml: `
      ---
      slides:
        -
          show: "This slide has subtitles."
          say:
            - "This slide is full of subtitles..."
          duration: 5000
    `,
    html:`
      <section data-markdown data-autoslide="5000">
        This slide has subtitles.
        <footer class="audio-notes">
          This slide is full of subtitles...
        </footer>
      </section>
      <section></section>
    `
  }));

  it('a 5 sec slide with a single shot of subtitles when "say:" is a string', () => check({
    yaml: `
      ---
      slides:
        -
          show: "This slide has subtitles."
          duration: 5000
          say: "This slide is full of subtitles..."
    `,
    html:`
      <section data-markdown data-autoslide="5000">
        This slide has subtitles.
        <footer class="audio-notes">
          This slide is full of subtitles...
        </footer>
      </section>
      <section></section>
    `
  }));

  it('a 10 sec slide with multiple subtitles', () => check({
    yaml: `
      ---
      slides:
        -
          show: "This slide has subtitles."
          say:
            - "Hello, and welcome to WatchTheDocs!"
            - "This slide is full of subtitles..."
            - >
              The last subtitle takes longest time, because it has more syllables.
              Total slide duration is 10 sec anyway.
              See you on the next slide, bye!"
          duration: 10000
    `,
    html:`
      <section data-markdown>
        This slide has subtitles.
        <footer class="audio-notes fragment current-visible" data-autoslide="3000">
          Hello, and welcome to WatchTheDocs!
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="3000">
          This slide is full of subtitles...
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="3000">
          The last subtitle takes longest time, because it has more syllables.
          Total slide duration is 10 sec anyway.
          See you on the next slide, bye!
        </footer>
      </section>
      <section></section>
    `
  }));

  it('two slides; one of them with multiple subtitles', () => check({
    yaml: `
      ---
      slides:
        -
          duration: 3000
          show: "This slide has subtitles."
          say:
            - "Hello, and welcome to WatchTheDocs!"
        -
          duration: 10000
          show: "2nd slide goes here."
          say:
            - "This is the 2nd slide."
            - "Unlike the first one, It has plenty of subtitles!"
    `,
    html:`
      <section data-markdown data-autoslide="3000">
        This slide has subtitles.
        <footer class="audio-notes"> Hello, and welcome to WatchTheDocs! </footer>
      </section>
      <section data-markdown>
        2nd slide goes here.
        <footer class="audio-notes fragment current-visible" data-autoslide="3000">
          This is the 2nd slide.
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="7000">
          Unlike the first one, It has plenty of subtitles!
        </footer>
      </section>
      <section></section>
    `
  }));

});
