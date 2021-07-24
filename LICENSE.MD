/*
 * JABCode Javascript port
 * @port to Javascript by Tom Sassen
 * Based on the original JABCode library written in C (see below), transpiled to
 * Javascript with Emscripten, and bundled with Webpack.
 * 
 * Relevant licenses:
 *
 * JABCode Encoding/Decoding Library
 *
 * Copyright 2016 by Fraunhofer SIT. All rights reserved.
 * See LICENSE file for full terms of use and distribution.
 * @link https://github.com/jabcode/jabcode/blob/master/LICENSE
 *
 * Contact: Huajian Liu <liu@sit.fraunhofer.de>
 *			Waldemar Berchtold <waldemar.berchtold@sit.fraunhofer.de>
 *
 * @file jabcode.h
 * @brief Main libjabcode header
 *
 * 
 * PNGLib
 * 
 * A handy class to calculate color values.
 *
 * @version 1.0
 * @author Robert Eisele <robert@xarg.org>
 * @copyright Copyright (c) 2010, Robert Eisele
 * @link http://www.xarg.org/2010/03/generate-client-side-png-files-using-javascript/
 * @license http://www.opensource.org/licenses/bsd-license.php BSD License
 * 
 * STB Image - v2.27
 * 
 * Public domain image loader - http://nothings.org/stb
 * no warranty implied; use at your own risk
 * 
 * Base64StringToHexArray function
 * 
 * Convert base64 data to hex buffer.
 * @copyright Sheepy
 * @link https://stackoverflow.com/a/57909068/893578
 * 
 * Emscripten
 * 
 * Emscripten is available under 2 licenses, the MIT license and the
 * University of Illinois/NCSA Open Source License.
 * Both are permissive open source licenses, with little if any
 * practical difference between them.
 * 
 * The reason for offering both is that (1) the MIT license is
 * well-known, while (2) the University of Illinois/NCSA Open Source
 * License allows Emscripten's code to be integrated upstream into
 * LLVM, which uses that license, should the opportunity arise.
 * 
 * @link https://emscripten.org/docs/introducing_emscripten/emscripten_license.html
 * 
 * Webpack
 * 
 * Webpack is a module bundler. Its main purpose is to bundle JavaScript
 * files for usage in a browser, yet it is also capable of transforming,
 * bundling, or packaging just about any resource or asset.
 * 
 * Webpack is licensed under the MIT license.
 * @link https://github.com/webpack/webpack/blob/main/LICENSE
 */