# AI Engineer Overview

Stable Diffusion is a very interesting technology, but consistency in style and quality is an open area of research. Since we are making a game, we’re not so interested in just arbitrary generation, but generation consistent with our game.

One way to do this is to utilize a corpus of existing images which have the stylistic details we want, and transfer them onto other images.

## Task

Utilizing the following repo and technique:
https://github.com/hlky/sd-enable-textual-inversion

Make a test pipeline showing demonstrable improvement of stability in generation of style using the provided assets and technology.

Generate and integrate the pre train so that all generations follow that style

Outline the steps necessary to make generation consistent and repeatable for non-technical users

Webaverse character and environment sets for style tuning are available here:
https://github.com/webaverse/ai-test-task-content
