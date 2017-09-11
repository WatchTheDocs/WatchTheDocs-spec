/*{{!
  
  ------------------
  View example :
  ------------------

  {
    "slides": [
      {
        "duration": 5000,
        "audio": false,
        "show": [
          "# WatchTheDocs Example\n\n&copy; WatchTheDocs.com 2017\n"
        ]
      },
      {
        "duration": 10000,
        "audio": [
          { "start": 0, "duration": 5000 },
          { "start": 5200, "duration": 3500 },
        ],
        "say": [
          "The second slide has a title and one paragraph.",
          "It also has a voice-over."
        ],
        "show": [
          "## Slide 2\n\nThis is the second slide. This text is displayed.\n"
        ]
      }
    ]
  }

}}*/

export default `
{{#slides}}
  <section{{#renderAutoSlide}} data-autoslide="{{duration}}"{{/renderAutoSlide}}{{#renderAudio}} data-audio-start="{{audio.0.start}}" data-audio-duration="{{audio.0.duration}}"{{/renderAudio}}>
    {{#show}}<div data-markdown>{{.}}</div>{{/show}}
    {{#renderSay}}
      <footer class="audio-notes{{#duration}} fragment current-visible{{/duration}}"{{#duration}} data-autoslide="{{.}}"{{/duration}}{{#audio}} data-audio-start="{{start}}" data-audio-duration="{{duration}}"{{/audio}}>
        {{text}}
      </footer> 
    {{/renderSay}}
  </section>
{{/slides}}
<section></section>
`;
