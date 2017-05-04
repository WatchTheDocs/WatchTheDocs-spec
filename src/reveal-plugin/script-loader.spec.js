import { jsdom } from 'jsdom';
import { getTags } from './index';
import load from './script-loader';

const getDocument = (html) => jsdom(html).documentElement;

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
