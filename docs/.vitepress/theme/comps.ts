import { App, Component } from "vue";

const glob = import.meta.glob(
    ["./components/**/*.vue"],
    { eager: true },
)

const modules: Record<string, any> = {}
Object.keys(glob).forEach(key => {
    const name = key.split("/").pop()?.replace(/^([a-zA-Z]*)\.vue$/, "$1")
    if (!name) return
    modules[name] = glob[key]
})

export function component(app: App) {
    for (const name in modules) {
        const comp: any = modules[name]
        app.component(name, comp.default)
    }
}

import * as Lumen from "@theojs/lumen"

import MaskText from "./components/MaskText.vue"
import BadgeText from "./components/text/BadgeText.vue";

import Footnote from "./others/footnote-plus/Footnote.vue"
import FootnoteRef from "./others/footnote-plus/FootnoteRef.vue"

export const components = {
    "mt": MaskText,
    "bt": BadgeText,

    "DocPill": Lumen.DocPill,
    "DocLinks": Lumen.DocLinks,
    "DocBoxCube": Lumen.DocBoxCube,

    "Footnote": Footnote,
    "FootnoteRef": FootnoteRef,
} as Record<string, Component>
