import { jsdom } from 'jsdom';

export const customJasmineMatchers = {

  toEqualHtml: (util, customEqualityTesters) => ({

    compare: (actual, expected) => {
      const strip = (v) => v.replace(/>\s+/g, '> ').replace(/\s+</g, ' <').replace(/\n */g, ' ');
      const pass = util.equals(
        jsdom(strip(actual)).body.innerHTML,
        jsdom(strip(expected)).body.innerHTML,
        customEqualityTesters);
      // console.log(jsdom(strip(actual)).body.innerHTML);
      // console.log(jsdom(strip(expected)).body.innerHTML);
      return {
        pass,
        message: (pass
          ? `Expected\n${actual}\nnot to have same HTML as\n${expected}`
          : `Expected\n${actual}\nto have same HTML as\n${expected}`
        )
      };
    } // </compare>

  }) // </toEqualHtml>

};
