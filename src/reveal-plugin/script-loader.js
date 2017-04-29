import 'whatwg-fetch';

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
  // Make sure type is "text/yaml"
  if (script_tag.getAttribute('type') !== 'text/yaml') {
    throw new Error('WatchTheDocs script has wrong MIME type. Must be "text/yaml".');
  }

  // Return text if "src" attribute is not specified
  const src = script_tag.getAttribute('src');
  if (!src) {
    return script_tag.text;
  }

  // If we have "src" then load it
  return fetch(src).then(response => response.text());
}

export default load;
