# JABCode Reader / Writer in Javascript
## **Based on the original JABCode library, transpiled with Emscripten**

## Just Another BarCode
[JABCode](https://jabcode.org/) is a high-density 2D barcode format, which is copyrighted 2016 by Fraunhofer SIT and made available under the [GNU Lesser General Public License v2.1](https://github.com/webpack/webpack/blob/main/LICENSE).
This port's author is not affiliated in any way, shape or form with the JABCode project, and as an unofficial port no support should be assumed in case of errors or bugs (as most bugs will be my fault, not theirs).
No warranty is provided anyway (as per the MIT License), but it should be clear that any complaints about this port should be aimed at this author, not to the original authors.

This author is grateful to all members of the JABCode project team, and decided to port an interface to JS to use in React/React Native/Node/regular browsers, so projects don't have to implement inferior solutions simply because they lack the knowledge to bridge C/javascript.
Seriously, it's awesome how much data can be packed in a small code.

## Build from source

A precompiled and minified JS file is provided in /dist/jabcodeJSLib.min.js, however it is recommended to build from source as to ensure the most up-to-date experience.

### Requirements for build
You need [Emscripten](https://emscripten.org/docs/tools_reference/emsdk.html) and [webpack](https://webpack.js.org/guides/installation/), plus something like [MSYS](https://www.msys2.org/wiki/MSYS2-introduction/) if building from Windows.
When using Emscripten it is recommended to set an EMSCRIPTEN_ROOT environment variable to the location of the EMCC binary in linux style notation (for example /c/emsdk/upstream/emscripten/).

### Building the source
First, follow the [instructions on the JABCode github](https://github.com/jabcode/jabcode/blob/master/README.md) to build the JABCode core library.
Afterwards, copy the resulting compiled file (src/jabcode/build/libjabcode.a) to the include folder of his project, overwriting the libjabcode.a file already present.
Then, simply run the Makefile. It will compile the C code with Emscripten, and then combine the various javascript assets into dist/jabcodeJSLib.min.js file.

## Usage
In browsers, simply include the module:
```<script type="module" src="jabcodeJSLib.min.js"></script>```
And in other environments, the module can simply be imported:
```import JabcodeJSInterface from 'jabcodeJSLib.min.js'```

After creating a JabcodeJSInterface object, it contains a encode_message and decode_message function.
Encode_message takes a string as argument to encode, plus optionally a symbol number and a color number, and returns a base64 encoded png image.
Decode_message takes a base64 encoded image or an arrayBuffer as argument, and returns a Promise that resolves with the decoded message.

