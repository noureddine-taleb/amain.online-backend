.PHONY=all

all: lib.c
	emcc lib.c -s WASM=1 -s NO_EXIT_RUNTIME=1 -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']" -o lib.html 

clean: 
	rm -rf *.html *.js *.wasm