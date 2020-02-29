This is an implementation of ["chapter.site.template"](https://github.com/TZMCommunity/chapter.site.template), started by [Juuso (jeukku)](https://github.com/jeukku)

## The Project's main structure

| [![Jekyll Logo](http://u.cubeupload.com/boqsc/jekyllsmall.png)](https://jekyllrb.com/docs/home/) | Jekyll structure description  | |
|:-:|-|-|
| 📂_includes | These are the partials that can be mixed and matched by your layouts and posts to facilitate reuse. <br> <blockquote>The liquid tag`{% include file.ext %}` can be used to include the partial in`_includes/file.ext`.</blockquote> |
| 📂_layouts | These are the templates that wrap posts. Layouts are chosen on a post-by-post basis in the [YAML Front Matter](https://jekyllrb.com/docs/frontmatter/), which is described in the next section. <br> <blockquote>The liquid tag `{{ content }}` is used to inject content into the web page.</blockquote> |
| 📂_posts | Your dynamic content, so to speak. <br> <blockquote>The naming convention of these files is important, and must follow the format: `YEAR-MONTH-DAY-title.MARKUP`.</blockquote> |
| 📂_sections | **Can someone take the quest** ❔ <br>We need to fill this interesting space. |
| 📂assets | The place where Images, Stylesheets are stored |
| 📂pages | These are the partials that can be mixed and matched by your layouts and posts to facilitate reuse.  |
| 📄_config.yml | Stores configuration data. Many of these options can be specified from the command line executable but it’s easier to specify them here so you don’t have to remember them.
| 📄 index.md | The main GitHub Pages serving file, this is the main file GitHub serves after _config.yml is finished rendering.
 
