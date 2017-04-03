                                                                                                        
# WatchTheDocs

A tool to turn your text documentation into presentations
with voice-over.

## Quick Start

First, create a Markdown document, or take an existing one.
For example, README.md from your GitHub project.

```markdown
    ## WatchTheDocs
    
    A tool to turn your text documentation into video presentations
    with voice-over.
    
    # Quick start
    
    First, create a markdown document:
    
        # My Presentation Title
        
        Document text
        Lorem ipsum...
    
    That's it, you are ready to go!
    
```

That's it, you are ready to go! WatchTheDocs will automatically generate
slides and voice-over based on the layout and content.

Here is how it happens:

  1. The top header and paragraphs following it are skipped by default
     (unless there are no more headers). It forms description of the presentation.
  2. Header always starts a new slide. First paragraph following the header
     always goes to the voice-over for that slide.
  3. Simple paragraph always goes to the voice-over.
  4. Tables, code blocks and images are placed on a separate slide
     together with a preceding header (if any), a preceding paragraph,
     or a header followed by a single paragraph. All subsequent paragraphs
     go to the voice-over for that slide until there is a condition for a
     new slide.
  5. Ordered and numbered lists are placed on a separate slide and at the
     same time generate voice-over. Only the first sentence of each item
     goes to the slide; the rest is only used for the voice-over.

To get a nice presentation the Markdown document has to be well-balanced.
If it isn't you may consider customizing it using a YAML file.

## Customizing slideshow and voiceover

To customize your presentation create another file
with the same name and extension ".watch".
It will be YAML with at least one element, "slides", which is
an ordered mapping:

```yaml
    ---
    slides: !!omap
      - "## Quick start":
      - "Here is how...":
      - "## Customizing slideshow...":
    ---
```

Each key in the mapping must correspond to a block in the
Markdown document. You can use a few starting words of the block,
followed by ellipsis. Such a block defines beginning of a slide
in the presentation. Remember to use colon at the end as it's an ordered
mapping, not a sequence.

By default simple paragraphs will go to the voice-over, while
all other blocks (images, tables, code blocks, ordered and unordered
lists) will be displayed as the slide content.

## "say" and "show"

You can change the default behavior by specifying explicitly
what to say and/or what to display on the slide:

```yaml
    ---
    slides: !!omap
      - "Quick start...":
      - "Now create another file...":
        show:
          - "README.watch file:"
          - "```yaml..."
      - "By default simple paragraphs...":
        show:
          - |
            ## Specifying explicitly what to say/show
          - "```yaml..."
          - |
            Note a literal block in YAML (marked with "|")
            and usage of markdown (see a heading above?)
        say:
          - "By default..."
          - "You can change..."
          - "Similarly..."
```

Similarly to the slide keys, each element in the "say" and "show"
sequences may be first few words of a corresponding block in the
Markdown document, followed by ellipsis. However, you may specify
content that does not exist in the document. If there is only
a "say" key, the remaining content implicitly goes to the slide.
Likewise, only "show" key assumes everything else that can be
pronounced goes to the voice-over.

## "highlight" and "reveal"

In addition to "show" and "say" you can use "highlight" element
to define what to highlight on the slide for each part of the
voiceover:

```yaml
     - 'In addition to "show" and "say" you can use "highlight" element...':
       show:
         - "```yaml..."
         - |
           * You can add "highlight" element
           * It's a mapping between the voice-over and text on the slide
           * The text is highlighted as you speak
           * It's performed by characters rather than blocks
       highlight:
         'you can use "highlight" element...' : '"highlight" element'
         "is a mapping between"               : "It's a mapping..."
         "The fragment will be highlighted"   : "highlighted as you speak"
         "Highlighting is performed..."       : "... performed by char..."
```

"highlight" is a mapping between the text to be pronounced and
the fragment to be highlighted on the slide. The fragments will
be highlighted as the voice-over moves down the script.

Highlighting is performed by characters rather than by blocks.
Optionally you may use ellipsis at the end which results in
highlighting until the end of the current tag. Ellipsis at the
beginning indicates highlighting from the beginning of the tag.

Similarly to "highlight", the "reveal" element defines what to
reveal on the slide for each part of the voiceover:

```yaml
     - 'Similarly to "highlight", the "reveal" element defines...':
       show:
         - "```yaml..."
         - |
           * You may add "reveal" element
           * Text will be hidden initially
       reveal:
         'the "reveal" element...': >
           * You may add "reveal" element
         "Text on your slide...": >
           * Text will be hidden...
```

Text on your slide will be hidden initially, and revealed gradually.
It's useful for lists and short paragraphs.

## End of the slide

Sometimes it may be useful to end slide a few blocks before the
next slide begins:

```yaml
    ---
    slides: !!omap
    - "This goes to the first slide...":
    - "Second slide starts here...":
      end: "This (and subsequent) paragraphs will be skipped..."
    - "And this one goes to the 3rd slide...":
    ---
```

## Summary of the Syntax

So, here are the basic elements of ".watch" file syntax:

```yaml
    ---
    slides: !!omap
    - "Ordered mapping of slides...":
      say:
        - Optional list of blocks for the voice-over...
      show:
        - Optional list of blocks for the slides...
      highlight:
        - What to highlight...
      reveal:
        - What to reveal...
      end: "Where to end the current slide..."
    - "More slides...":
    ---
```

If you'd like to contribute or interested in the future of this project,
please drop a line to this email address:
[watchthedocs@davidavs.com](mailto:watchthedocs@davidavs.com).
