import "./style.sass"

export function mountCursorRing() {
    if (typeof document === "undefined") return () => {}

    const box = document.createElement("div")
    const cr = document.createElement("div")
    box.classList.add("cursor-ring-box")
    cr.classList.add("cursor-ring", "visually-hidden")
    box.appendChild(cr)
    document.body.appendChild(box)

    document.body.classList.add("enable-cursor")

    function ringAppear() { cr.classList.remove("visually-hidden") }
    function ringHide() { cr.classList.add("visually-hidden") }
    function ringDown() { cr.classList.add("down") }
    function ringUp() { cr.classList.remove("down") }
    function ringActive() { cr.classList.add("active") }
    function ringInactive() { cr.classList.remove("active") }

    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let frame = 0

    function updatePos(e: MouseEvent) {
        tx = e.clientX
        ty = e.clientY
    }

    function mouseStyleChange(e: MouseEvent) {
        if (e.target instanceof HTMLElement) {
            const s = window.getComputedStyle(e.target)
            const c = s.getPropertyValue("--custom-cursor-ring")
            if (c === "active") ringActive()
            else ringInactive()
        }
    }

    function animate() {
        const k = 0.35
        cx += (tx - cx) * k
        cy += (ty - cy) * k

        cr.style.left = `${cx}px`
        cr.style.top = `${cy}px`

        frame = window.requestAnimationFrame(animate)
    }

    function onMouseOutPage(e: MouseEvent) {
        if (e.relatedTarget === null) ringHide()
    }

    function onPointerDown(e: PointerEvent) {
        switch (e.pointerType) {
            case "mouse":
                updatePos(e)
                ringDown()
                ringAppear()
                break
            case "pen":
            case "touch":
                ringHide()
                break
        }
    }

    function onPointerUp(e: PointerEvent) {
        switch (e.pointerType) {
            case "mouse":
                updatePos(e)
                ringUp()
                ringAppear()
                break
            case "pen":
            case "touch":
                ringHide()
                break
        }
    }

    function onPointerMove(e: PointerEvent) {
        switch (e.pointerType) {
            case "mouse":
                ringAppear()
                break
            case "pen":
            case "touch":
                ringHide()
                break
        }
    }

    function onFullscreenChange() {
        if (document.fullscreenElement) document.body.classList.remove("enable-cursor")
        else document.body.classList.add("enable-cursor")
    }

    document.addEventListener("mousemove", updatePos)
    document.addEventListener("mouseover", mouseStyleChange)
    document.addEventListener("mouseout", mouseStyleChange)
    document.addEventListener("mouseout", onMouseOutPage)
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("pointerup", onPointerUp)
    document.addEventListener("pointermove", onPointerMove)
    document.addEventListener("fullscreenchange", onFullscreenChange)

    frame = window.requestAnimationFrame(animate)

    return () => {
        window.cancelAnimationFrame(frame)
        document.removeEventListener("mousemove", updatePos)
        document.removeEventListener("mouseover", mouseStyleChange)
        document.removeEventListener("mouseout", mouseStyleChange)
        document.removeEventListener("mouseout", onMouseOutPage)
        document.removeEventListener("pointerdown", onPointerDown)
        document.removeEventListener("pointerup", onPointerUp)
        document.removeEventListener("pointermove", onPointerMove)
        document.removeEventListener("fullscreenchange", onFullscreenChange)

        document.body.classList.remove("enable-cursor")
        box.remove()
    }
}
