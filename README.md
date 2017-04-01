                                                                                                        
WatchTheDocs
============

A tool to turn your text documentation into video presentations
with voice-over.

Quick Start
-----------

First, create a Markdown document, or take an existing one.
For example, README.md from your GitHub project.

```markdown
    WatchTheDocs
    ============
    
    A tool to turn your text documentation into video presentations
    with voice-over.
    
    Quick start
    -----------
    
    First, create a markdown document.
    
    Now create another file with the same name.
    
 ```
    
Now create another file with the same name and extension ".watch".
It will be YAML with at least one ordered mapping, "slides".

```yaml
    ---
    slides: !!omap
      - "Quick start...":
      - "Now create another file...":
    ---
```

Each key in the ordered mapping must correspond to a block in the
Markdown document. You can use a few starting words of the block,
followed by ellipsis. Such a block defines beginning of a slide
in the presentation.

By default simple paragraphs will go to the voice-over, while
all other blocks (images, tables, code blocks, ordered and unordered
lists) will be displayed as the slide content.

You may change the default behavior by specifying explicitly
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
          - "You may change..."
          - "Similarly..."
```

Similarly to the slide keys, each element in the "say" and "show"
sequences may be first few words of a corresponding block in the
Markdown document, followed by ellipsis. However, you may specify
content that does not exist in the document. If there is only
a "say" key, the remaining content implicitly goes to the slide.
Likewise, only "show" key assumes everything else that can be
pronounced goes to the voice-over.

In addition to "show" and "say" you may use "highlight" element
to define what to highlight on the slide for each part of the
voiceover:

```yaml
     - 'In addition to "show" and "say" you may use "highlight" element...':
       show:
         - "```yaml..."
         - |
           * You may add "highlight" element
           * It's a mapping between the voice-over and text on the slide
           * The text is highlighted while you speak
       highlight:
         "TODO": >
           You may add "highlight" element
         "TODO": "It's a mapping"
         "TODO": "highlighted while you speak"
         "TODO":
```

TODO

Similarly to "highlight", the "reveal" element defines what to
reveal on the slide for each part of the voiceover:

```yaml
     - 'Similarly to "highlight", the "reveal" element defines...':
       show:
         - "```yaml..."
         - |
           * You may add "reveal" element
           * It's a mapping between the voice-over and text on the slide
           * The text is revealed while you speak
       reveal:
         "TODO": >
           * You may add "reveal" element
         "TODO": "* It's a mapping..."
         "TODO": "* The text is revealed..."
         "TODO":
```

TODO
