import { jsdom } from 'jsdom';
import { getTags } from './index';

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
