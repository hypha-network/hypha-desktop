// Make window draggable
document.addEventListener("DOMContentLoaded", (event) => {
  const windowTopBar = document.createElement("div")
  windowTopBar.style.width = "100%"
  windowTopBar.style.height = "32px"
  windowTopBar.style.position = "absolute"
  windowTopBar.style.top = windowTopBar.style.left = "0"
  windowTopBar.style["-webkit-app-region"] = "drag"
  document.body.appendChild(windowTopBar)
})
