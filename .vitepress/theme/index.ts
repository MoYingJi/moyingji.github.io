import { Theme } from "vitepress"
import DefaultTheme from "vitepress/theme-without-fonts"
import { watch } from "vue"

import MyLayout from "./MyLayout.vue"
import { initUserSettings, userSettings } from "./settings/user-settings.ts"

import "./styles/_css.ts"

import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css"
import "@nolebase/vitepress-plugin-enhanced-mark/client/style.css"

import * as Comp from "./comps.ts"

if (!import.meta.env.SSR) {
    import("./others/search-box-animation/script.ts")
}

const parent: Theme = DefaultTheme

// noinspection JSUnusedGlobalSymbols
export default {
    extends: parent,
    Layout: MyLayout,

    async enhanceApp(ctx) {
        parent.enhanceApp?.(ctx)

        const app = ctx.app
        const comps = Comp.components
        Comp.component(app)
        Object.keys(comps).forEach(k => app.component(k, comps[k]))

        if (!import.meta.env.SSR) {
            initUserSettings()

            let unmountCursor: undefined | (() => void)
            async function applyCursor(enabled: boolean) {
                if (enabled) {
                    if (unmountCursor) return
                    const { mountCursorRing } = await import("./others/cursor-and-ring/script.ts")
                    unmountCursor = mountCursorRing()
                    return
                }

                unmountCursor?.()
                unmountCursor = undefined
            }

            await applyCursor(userSettings.customCursor)
            watch(() => userSettings.customCursor, enabled => { void applyCursor(enabled) })
        }
    },
} satisfies Theme
