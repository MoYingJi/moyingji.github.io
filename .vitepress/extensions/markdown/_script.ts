import type { MarkdownRenderer } from "vitepress";

import AnimatedLink from "./animated-link.ts";
import FootnotePlus from "./footnote-plus.ts";

export function config(md: MarkdownRenderer) {
    md.use(AnimatedLink)
    md.use(FootnotePlus)
}
