import jsQR from "jsqr";

self.addEventListener("message", function(event) {
    console.log(event.data);
    self.postMessage("message, [imageData.data.buffer]");
});