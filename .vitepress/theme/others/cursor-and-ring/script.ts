import "./style.sass"

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

function updatePos(e: MouseEvent) {
    tx = e.clientX
    ty = e.clientY
}

document.addEventListener("mousemove", updatePos)
document.addEventListener("mouseover", mouseStyleChange)
document.addEventListener("mouseout",  mouseStyleChange)

function mouseStyleChange(e: MouseEvent) {
    // ↑ 鼠标移入/移出元素时 修改样式 判断是否切换为 active
    if (e.target instanceof HTMLElement) {
        const t = e.target
        const s = window.getComputedStyle(t)
        const c = s.getPropertyValue("--custom-cursor-ring")
        if (c === "active") ringActive()
        else ringInactive()
    }
    const b = e.button
    if (typeof b === "object" && b == 0)
        ringDown(); else ringUp()
}

function animate() {
    const k = 0.35
    cx += (tx - cx) * k
    cy += (ty - cy) * k

    cr.style.left = `${cx}px`
    cr.style.top  = `${cy}px`

    requestAnimationFrame(animate)
}
animate()

// 当鼠标移出页面时 隐藏 ring
document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget === null) ringHide()
})

// 控制 ring 是否显示

document.addEventListener("pointerdown", (e) => {
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
})
document.addEventListener("pointerup", (e) => {
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
})
document.addEventListener("pointermove", (e) => {
    switch (e.pointerType) {
        case "mouse":
            ringAppear()
            break

        case "pen":
        case "touch":
            ringHide()
            break
    }
})

// 全屏修复
document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement)
         document.body.classList.remove("enable-cursor")
    else document.body.classList.add("enable-cursor")
})
