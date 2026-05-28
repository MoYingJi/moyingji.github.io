// 来自 Linho1219，有修改
// https://github.com/Linho1219/LinhoNotes/blob/main/.vitepress/configurablePlugins/customLinkClassName.ts

import MarkdownIt from "markdown-it"

export default function (md: MarkdownIt) {
    const defaultRender =
        md.renderer.rules.link_open ||
        function (tokens, idx, options, _, self) {
            return self.renderToken(tokens, idx, options);
        }

    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        if (!tokens[idx].attrGet("class")) tokens[idx].attrSet("class", "animated-link");
        return defaultRender(tokens, idx, options, env, self);
    }
}
