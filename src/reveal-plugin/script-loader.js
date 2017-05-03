import 'whatwg-fetch';

const dedent = (content) => {
  // Indent the very first line with many spaces
  var ret = Array(content.length).join(' ') + content.trim();

  // while there are no unindented lines,
  // dedent all lines by one space:
  while( /^[^ ]/gmu.test(ret) === false ) {
    ret = ret.replace(/^ /gmu, '');
  }

  return ret.trim();
}

/*
 * Loads WatchTheDocs script from the <script> tag.
 * 
 * Requires content type to be "text/yaml"
 * The script can be internal or external.
 *
 * Internal script example:
 *
 *   <script type="text/yaml">
 *   ---
 *   slides: !!omap
 *   ...
 *   </script>
 *
 * External script example:
 *  
 *   <script type="text/yaml" src="./myscript.watch" />
 *
 */
const load = (script_tag) => {
  // Return text if "src" attribute is not specified
  const src = script_tag.getAttribute('src');
  if (!src) {
    return dedent(script_tag.textContent);
  }

  // If we have "src" then load it
  return fetch(src).then(response => response.text());
}

export default load;
