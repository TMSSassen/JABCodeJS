
class ImageProcessor {

    getByteBufferFromImage = (img) => {
        if (typeof img === 'string') {
            return new Promise((resolve) => {
                let buffer = this.base64StringToHexArray(img);
                resolve(buffer);
            });
        }
        if (img.arrayBuffer) {
            return img.arrayBuffer();
        }
        return new Promise((resolve, reject) => {
            reject(true);
        });
    }
    /* Convert base64 data to hex buffer.  https://stackoverflow.com/a/57909068/893578
     *   txt : Base64 string.
     */
    base64StringToHexArray(txt) {
        let data_start = txt.indexOf("base64,");
        if (data_start > -1) {
            txt = txt.substring(data_start + "base64,".length);
        }
        const result = [];
        let v1, v2, v3, v4;
        for (let i = 0, len = txt.length; i < len; i += 4) {
            // Map four chars to values.
            v1 = ImageProcessor.values[ txt.charCodeAt(i) ];
            v2 = ImageProcessor.values[ txt.charCodeAt(i + 1) ];
            v3 = ImageProcessor.values[ txt.charCodeAt(i + 2) ];
            v4 = ImageProcessor.values[ txt.charCodeAt(i + 3) ];
            // Split and merge bits, then map and push to output.
            result.push(
                    (v1 << 2) | (v2 >> 4),
                    ((v2 & 15) << 4) | (v3 >> 2),
                    ((v3 & 3) << 6) | v4
                    );
        }
        // Trim result if the last values are '='.
        if (v4 === 64) {
            result.splice(v3 === 64 ? -2 : -1);
        }
        return new Uint16Array(result, 0, result.length);
    }
    ;
            static populateLookups() {
        ImageProcessor.values = [];
        const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        for (let i = 0; i < 65; i++)
            ImageProcessor.values[ keys.charCodeAt(i) ] = i;
    }
}
ImageProcessor.populateLookups();
export default ImageProcessor;