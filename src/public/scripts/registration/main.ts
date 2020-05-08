let fPass = document.getElementById("fPass")
let sPass = document.getElementById("sPass")

let buffer: string = ""

sPass?.addEventListener("keydown", (event: KeyboardEvent) => {
    if (buffer.length < 1 && event.key == "Backspace") return
    if (event.key == "Backspace") return buffer = buffer.slice(0, buffer.length - 1)
    buffer+=event.key
    alert(buffer)
})