# WatchTheDocs: Implementation based on RevealJS

WatchTheDocs uses RevealJS to render a presentation,
which is a slideshow with voice-over and subtitles.
This functionality is implemented as a JavaScript plugin
for RevealJS.

The presentation consists of following parts:

* HTML5 file. It opens in a web browser and loads
  other components of the presentation: JavaScript,
  slides YAML file and voice-over audio.
* JavaScript modules. They include RevealJS bundle
  with its built-in plugins and WatchTheDocs plugin.
* Slides file. It's a YAML file defining slides content
  and time points for each slide's voice-over within
  the audio file, along with durations.
* Audio file. Used as a voice-over.
* Slides media. It includes images and other media
  displayed on the slides.

## Slides file structure.

It's a YAML file with `.watch` extension. Unlike a
watch file that complements markdown script, it does
not contain references to locations within the script
but instead fully defines the content to be shown
on the slides and in the subtitles. Additionally it
contains time points for each slide.

Here is an example:

```yaml
---
slides: !!omap
  - "# WatchTheDocs...":
      duration: 5000
      show:
        - |
            # WatchTheDocs Example

            &copy; WatchTheDocs.com 2017
  - "This is the second slide...":
      duration: 10000
      audio:
        position: 0
        duration: 7000
      say:
        - "The second slide has a title and one paragraph."
        - "It also has a voice-over."
      show:
        - "## Slide 2"
        - "This is the second slide. This text is displayed."
```

* The root element, `slides`, is an ordered map.
* Each item in the ordered map defines rendering of a single slide.
* Each item is a map with following elements:
  - **show** -- required list of pieces of markdown, forming a slide
  - **say** -- optional list of strings that go to voiceover
  - **duraiton** -- required integer, duration of the slide in milliseconds
  - **audio** -- optional map of two integers: **position** and **duration**,
    defining the position within the audio file from which to start playing
    and play duration for the slide.


## HTML5 file structure

There are a few options to structure HTML file. Here is the base structure
with all the parts represented as separate assets:

```html
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>WatchTheDocs Presentation</title>

    <link rel="stylesheet" href="reveal.js/css/reveal.css">
    <link rel="stylesheet" href="reveal.js/css/theme/black.css">

    <script id="wtd_script" type="text/yaml" src="script.watch"></script>

  </head>
  <body>
    <!-- Content -->
    <div class="reveal">
      <div class="slides"></div>
    </div>
    <audio id="wtd_voice" src="voice-over.mp3"></audio>

    <!-- Scripts -->
    <script src="reveal.js/lib/js/head.min.js"></script>
    <script src="reveal.js/js/reveal.js"></script>

    <script src="watchthedocs-reveal-plugin.js"></script>
    <script> WatchTheDocs.init('wtd_script', 'wtd_voice') </script>

    <script>
        // More info https://github.com/hakimel/reveal.js#configuration
        Reveal.initialize({
            history: true,
            transition: 'fade',
            autoSlide: 1,
            controls: false,
            progress: false,

            // More info https://github.com/hakimel/reveal.js#dependencies
            dependencies: [
              /* Default Reveal.js dependencies */
              { src: 'node_modules/reveal.js/plugin/markdown/marked.js' },
              { src: 'node_modules/reveal.js/plugin/markdown/markdown.js' },
              { src: 'node_modules/reveal.js/plugin/notes/notes.js',
                async: true },
              { src: 'node_modules/reveal.js/plugin/highlight/highlight.js',
                async: true,
                callback: function() { hljs.initHighlightingOnLoad(); } }
            ]
        });
    </script>
  </body>
</html>
```

If the presentation is intended to be opened from the local filesystem it makes sense
to place WatchTheDocs slides content inside the HTML file, as the browser can not load
them from the filesystem:

```html
<script id="wtd_script" type="text/yaml">
---
slides: !!omap
  - "# WatchTheDocs...":
      duration: 5000
      show:
        - |
            # WatchTheDocs Example

            &copy; WatchTheDocs.com 2017
  - "This is the second slide...":
      duration: 10000
      audio:
        position: 0
        duration: 7000
      say:
        - "The second slide has a title and one paragraph."
        - "It also has a voice-over."
      show:
        - "## Slide 2"
        - "This is the second slide. This text is displayed."
</script>
```

Finally, you may choose to put all the assets inside a single HTML5 file. Even
audio can be BASE64-encoded:

```html
<audio id="wtd_voice" src="data:audio/ogg;base64,T2dnUwACAAA..."></audio>
```
