import "./style.sass"

const observer = new MutationObserver(mutations => {
    for (const mutation of mutations)
        for (const node of mutation.addedNodes)
            if (node instanceof HTMLElement && node.classList.contains("VPLocalSearchBox"))
                searchEnter(node)
})
observer.observe(document.body, { childList: true, subtree: true })

const remove = document.body.removeChild
document.body.removeChild = function <T extends Node> (child: T): T {
    if (child instanceof HTMLElement && child.classList.contains("VPLocalSearchBox")) {
        searchLeave(child)
        return child
    }
    return remove.call(this, child) as T
}

function searchEnter(e: HTMLElement) {
    e.classList.add("v-enter")
}
function searchLeave(e: HTMLElement) {
    e.classList.add("v-leave")
    e.addEventListener("animationend", () => {
        e.remove()
    }, { once: true })
}
