import jsQR from "jsqr";

export default () => { self.addEventListener("message", function(event) {
    // console.log(event.data);
    // const code = jsQR(image.data, image.width, image.height);

    postMessage("message, [imageData.data.buffer]");
})};