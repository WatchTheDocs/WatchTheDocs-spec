import Browser from 'zombie';
import { loadTags } from './index';

const getDocument = () => {
  const browser = new Browser();
  browser.visit('about:blank');
  return browser.window.document;
};

describe('HTML file initializer', () => {

  it('Throws an error if no script', () => {
    expect(() => {
      const document = getDocument();
      document.write(
        '<html><head></head><body><div class="reveal"><div class="slides"></div></div></body></html>'
      );
      loadTags(document);
    }).toThrowError(/Could not find WatchTheDocs script/);
  });

  it('Throws an error if no ".reveal .slides" element', () => {
    expect(() => {
      const document = getDocument();
      document.write(
        '<html><head><script type="text/yaml"></script></head><body></body></html>'
      );
      loadTags(document);
    }).toThrowError(/Could not find "slides" div/);
  });

});
