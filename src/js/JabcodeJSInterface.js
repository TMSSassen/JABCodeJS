import emscript from './jabcodeJSLib.js';
import ImageProcessor from './ImageProcessor.js';
import PNGLib from './PNGLib.js';

class JabcodeJSInterface
{
    getProcessor=() => {
        if(!this.processor){
            this.processor=new ImageProcessor();
        }
        return this.processor;
    }
    encode_message = (msg,symbol_num=null,color_num=null) => {
        if(symbol_num === null){
            symbol_num=emscript._getDefaultSymbolNumber();
        }
        if(color_num === null){
            color_num=emscript._getDefaultColorNumber();
        }
        let ptr = emscript.ccall('encode_image', 'array', ['string','int','int'],
                    [msg,symbol_num,color_num]);
        let length = emscript.HEAP32[ptr/4];
        let arg_length=emscript.HEAP32[ptr/4+1];
        let width = emscript.HEAP32[ptr/4+2];
        let height = emscript.HEAP32[ptr/4+3];
        let depth=emscript.HEAP32[ptr/4+4];
        let lib=new PNGLib(width,height,depth);
        for(let i=0;i<width;i++){
            for(let j=0;j<height;j++){
                let pixIndex=(j*width+i)*4 + 20 + ptr;
                lib.buffer[lib.index(i,j)] = lib.color(emscript.HEAPU8[pixIndex],
                                                       emscript.HEAPU8[pixIndex+1],
                                                       emscript.HEAPU8[pixIndex+2],
                                                       emscript.HEAPU8[pixIndex+3]);
            }
        }
        emscript._free(ptr);
        return "data:image/png;base64,"+lib.getBase64();
    }
    decode_message=(img)=>
    {
        return this.getProcessor().getByteBufferFromImage(img)
                .then((buffer)=>{
                    this.module = emscript;
                    let length=buffer.byteLength;
                    let ptr=emscript._malloc(length);
                    for(let i=0;i<length;i++){
                        emscript.HEAPU8[ptr+i]=buffer[i];
                    }
                    let resultptr=emscript.ccall('decode_image', 'int', ['int','int'],
                        [ptr,length]);
                    length=emscript.HEAP32[resultptr/4];
                    let msg=[];
                    for(let i=0;i<length;i++){
                        msg.push(emscript.HEAPU8[resultptr+8+i]);
                    }
                    emscript._free(ptr);
                    emscript._free(resultptr);
                    return String.fromCharCode(...msg);
         });
    }
}
window.JabcodeJSInterface=JabcodeJSInterface;
export default JabcodeJSInterface;
