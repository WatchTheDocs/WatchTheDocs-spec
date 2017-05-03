import { jsdom } from 'jsdom';
import { getTags } from './index';
import load from './script-loader';

const getDocument = (html) => jsdom(html).documentElement;

describe('HTML file initializer', () => {

  it('returns scriptTag and slidesTag', () => {
    const document = getDocument(`
      <html><head>
      <script type="text/yaml"></script>
      </head><body>
      <div class="reveal"><div class="slides"></div></div>
      </body></html>'
    `);

    const tags = getTags(document);

    expect(tags.scriptTag).toBeTruthy();
    expect(tags.slidesTag).toBeTruthy();
  });

  it('throws an error if no script', () => {
    expect(() => {
      const document = getDocument(
        '<html><head></head><body><div class="reveal"><div class="slides"></div></div></body></html>'
      );
      getTags(document);
    }).toThrowError(/Could not find WatchTheDocs script/);
  });

  it('throws an error if no ".reveal .slides" element', () => {
    expect(() => {
      const document = getDocument(
        '<html><head><script type="text/yaml"></script></head><body></body></html>'
      );
      getTags(document);
    }).toThrowError(/Could not find "slides" div/);
  });

});

describe('WatchTheDocs script loader', () => {

  const getScriptTag = (tagHtml) => {
    const document = getDocument(`
      <html><head>${tagHtml}</head><body>
      <div class="reveal"><div class="slides"></div></div>
      </body></html>`
    );
    return getTags(document).scriptTag;
  }
   
  it('Loads the script from the tag content', () => {
    const tag = getScriptTag([
      '<script type="text/yaml">',
      '---',
      'slides: !!omap',
      ' - "Slide 1":',
      ' - "Slide 2":',
      '</script>'
    ].join('\n'));

    const yaml = load(tag);

    expect(yaml).toEqual(
      '---\nslides: !!omap\n - "Slide 1":\n - "Slide 2":'
    );
  });

  it('Dedents the script loaded from the tag content', () => {
    const tag = getScriptTag([
      '<script type="text/yaml">',
      '    ---',
      '    slides: !!omap',
      '     - "Slide 1":',
      '     - "Slide 2":',
      '</script>'
    ].join('\n'));

    const yaml = load(tag);

    expect(yaml).toEqual(
      '---\nslides: !!omap\n - "Slide 1":\n - "Slide 2":'
    );
  });
});
