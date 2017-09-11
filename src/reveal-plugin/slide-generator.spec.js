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
      <section>
        <div data-markdown>Hello, World!</div>
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
      <section>
        <div data-markdown>This slide has subtitles.</div>
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
      <section>
        <div data-markdown>This slide has subtitles.</div>
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
      <section>
        <div data-markdown>This slide has subtitles.</div>
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
      <section>
        <div data-markdown>This slide has subtitles.</div>
        <footer class="audio-notes"> Hello, and welcome to WatchTheDocs! </footer>
        <footer class="audio-notes"> This slide is full of subtitles... </footer>
        <footer class="audio-notes"> See you on the next slide, bye! </footer>
      </section>
      <section>
        <div data-markdown>2nd slide goes here.</div>
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
      <section data-autoslide="10000">
        <div data-markdown>Hello, World!</div>
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
      <section data-autoslide="5000">
        <div data-markdown>This slide has subtitles.</div>
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
      <section data-autoslide="5000">
        <div data-markdown>This slide has subtitles.</div>
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
              Total slide duration is 15 sec anyway.
              See you on the next slide, bye!
          duration: 15000
    `,
    html:`
      <section>
        <div data-markdown>This slide has subtitles.</div>
        <footer class="audio-notes fragment current-visible" data-autoslide="3947">
          Hello, and welcome to WatchTheDocs!
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="2368">
          This slide is full of subtitles...
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="8685">
          The last subtitle takes longest time, because it has more syllables.
          Total slide duration is 15 sec anyway. See you on the next slide, bye!
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
      <section data-autoslide="3000">
        <div data-markdown>This slide has subtitles.</div>
        <footer class="audio-notes"> Hello, and welcome to WatchTheDocs! </footer>
      </section>
      <section>
        <div data-markdown>2nd slide goes here.</div>
        <footer class="audio-notes fragment current-visible" data-autoslide="3750">
          This is the 2nd slide.
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="6250">
          Unlike the first one, It has plenty of subtitles!
        </footer>
      </section>
      <section></section>
    `
  }));

  it('a 5 sec slide with a single shot of subtitles and audio marks', () => check({
    yaml: `
      ---
      slides:
        -
          show: "This slide has subtitles."
          duration: 5000
          say: "This slide is full of subtitles..."
          audio:
            -
              start: 0
              duration: 5000
    `,
    html:`
      <section data-autoslide="5000" data-audio-start="0" data-audio-duration="5000">
        <div data-markdown>This slide has subtitles.</div>
        <footer class="audio-notes">
          This slide is full of subtitles...
        </footer>
      </section>
      <section></section>
    `
  }));

  it('a 10 sec slide with multiple subtitles and audio marks', () => check({
    yaml: `
      ---
      slides:
        -
          show: "This slide has subtitles."
          audio:
            -
              start: 0
              duration: 1000
            -
              start: 1200
              duration: 1500
            -
              start: 3000
              duration: 7000
          say:
            - "Hello, and welcome to WatchTheDocs!"
            - "This slide is full of subtitles..."
            - >
              The last subtitle takes longest time, because it has more syllables.
              Total slide duration is 15 sec anyway.
              See you on the next slide, bye!
          duration: 10000
    `,
    html:`
      <section>
        <div data-markdown>This slide has subtitles.</div>
        <footer class="audio-notes fragment current-visible" data-autoslide="1000" data-audio-start="0" data-audio-duration="1000">
          Hello, and welcome to WatchTheDocs!
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="1500" data-audio-start="1200" data-audio-duration="1500">
          This slide is full of subtitles...
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="7000" data-audio-start="3000" data-audio-duration="7000">
          The last subtitle takes longest time, because it has more syllables.
          Total slide duration is 15 sec anyway. See you on the next slide, bye!
        </footer>
      </section>
      <section></section>
    `
  }));

  it('two slides; one of them with multiple subtitles. Both with audio marks', () => check({
    yaml: `
      ---
      slides:
        -
          duration: 3000
          show: "This slide has subtitles."
          audio:
            -
              start: 100
              duration: 3000
          say:
            - "Hello, and welcome to WatchTheDocs!"
        -
          duration: 10000
          show: "2nd slide goes here."
          audio:
            -
              start: 3200
              duration: 4500
            -
              start: 8000
              duration: 5000
          say:
            - "This is the 2nd slide."
            - "Unlike the first one, It has plenty of subtitles!"
    `,
    html:`
      <section data-autoslide="3000" data-audio-start="100" data-audio-duration="3000">
        <div data-markdown>This slide has subtitles.</div>
        <footer class="audio-notes"> Hello, and welcome to WatchTheDocs! </footer>
      </section>
      <section>
        <div data-markdown>2nd slide goes here.</div>
        <footer class="audio-notes fragment current-visible" data-autoslide="4500" data-audio-start="3200" data-audio-duration="4500">
          This is the 2nd slide.
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="5000" data-audio-start="8000" data-audio-duration="5000">
          Unlike the first one, It has plenty of subtitles!
        </footer>
      </section>
      <section></section>
    `
  }));

  it('a slide with more subtitles than audio marks', () => check({
    yaml: `
      ---
      slides:
        -
          show: "This slide has subtitles."
          audio:
            -
              start: 0
              duration: 1000
            -
              start: 1200
              duration: 1500
            -
              start: 3000
              duration: 7000
          say:
            - "Hello, and welcome to WatchTheDocs!"
            - "This slide is full of subtitles..."
            - >
              The last subtitle takes longest time, because it has more syllables.
              Total slide duration is 15 sec anyway.
              See you on the next slide, bye!
            - The last two subtitles are mute.
            - They take up the rest of the time (in this case 5.5 seconds) divided proportionally.
          duration: 15000
    `,
    html:`
      <section>
        <div data-markdown>This slide has subtitles.</div>

        <footer class="audio-notes fragment current-visible" data-autoslide="1000" data-audio-start="0" data-audio-duration="1000">
          Hello, and welcome to WatchTheDocs!
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="1500" data-audio-start="1200" data-audio-duration="1500">
          This slide is full of subtitles...
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="7000" data-audio-start="3000" data-audio-duration="7000">
          The last subtitle takes longest time, because it has more syllables.
          Total slide duration is 15 sec anyway. See you on the next slide, bye!
        </footer>

        <footer class="audio-notes fragment current-visible" data-autoslide="1375">
          The last two subtitles are mute.
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="4125">
          They take up the rest of the time (in this case 5.5 seconds) divided proportionally.
        </footer>

      </section>
      <section></section>
    `
  }));

  it('a slide with more audio marks than subtitles', () => check({
    yaml: `
      ---
      slides:
        -
          show: "This slide has subtitles."
          audio:
            -
              start: 0
              duration: 1000
            -
              start: 1200
              duration: 1500
            -
              start: 3000
              duration: 7000
          say:
            - "Hello, and welcome to WatchTheDocs!"
            - "This slide is full of subtitles, but text of the last one is ommitted. It just speaks!"
          duration: 15000
    `,
    html:`
      <section>
        <div data-markdown>This slide has subtitles.</div>
        <footer class="audio-notes fragment current-visible" data-autoslide="1000" data-audio-start="0" data-audio-duration="1000">
          Hello, and welcome to WatchTheDocs!
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="1500" data-audio-start="1200" data-audio-duration="1500">
          This slide is full of subtitles, but text of the last one is ommitted. It just speaks!
        </footer>
        <footer class="audio-notes fragment current-visible" data-autoslide="7000" data-audio-start="3000" data-audio-duration="7000">
        </footer>
      </section>
      <section></section>
    `
  }));

});
