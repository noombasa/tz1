export const startVideo = (videoEl, stream) => {
    if (videoEl.srcObject !== undefined) {
      videoEl.srcObject = stream;
    } else if (videoEl.mozSrcObject !== undefined) {
      videoEl.mozSrcObject = stream;
    } else if (window.URL.createObjectURL) {
      videoEl.src = window.URL.createObjectURL(stream);
    } else if (window.webkitURL) {
      videoEl.src = window.webkitURL.createObjectURL(stream);
    } else {
      videoEl.src = stream;
    }
    videoEl.play();
}
