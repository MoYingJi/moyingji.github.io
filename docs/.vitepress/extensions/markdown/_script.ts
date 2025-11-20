import MarkdownIt from "markdown-it";

import AnimatedLink from "./animated-link.ts";
import FootnotePlus from "./footnote-plus.ts";

export function config(md: MarkdownIt) {
    md.use(AnimatedLink)
    md.use(FootnotePlus)
}
