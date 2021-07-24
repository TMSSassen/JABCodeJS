SRCS=$(wildcard ./src/C/*.c)
INC_SRCS=$(wildcard ./include/*.h)
OBJS=$(SRCS:.c=.o)
NAME=./src/js/jabcodeJSLib.js
WP_NAME=./dist/jabcodeJSLib.min.js

ifeq (${EMSCRIPTEN_ROOT},undefined)
	EMCC=emcc
else
	EMCC=${EMSCRIPTEN_ROOT}/emcc
endif

all: c js
c: 
	$(EMCC) -Oz $(SRCS) ./include/libjabcode.a -o $(NAME) -s EXPORTED_FUNCTIONS=["_free","_malloc"] -s EXPORTED_RUNTIME_METHODS=["cwrap","ccall"] -s WASM=0 -s SINGLE_FILE=1 -s FILESYSTEM=0
	printf "\nexport default Module;\n" >> $(NAME)
js:
	npx webpack -o ./ --output-filename $(WP_NAME)
	cat ./include/licenses.txt $(WP_NAME) > $(WP_NAME).new; mv $(WP_NAME).new $(WP_NAME)
	cp ./include/licenses.txt $(WP_NAME).LICENSE.txt
	printf "\nexport default JabcodeJSInterface;\n" >> $(WP_NAME)


	