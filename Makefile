identifier=io.nauman.PawExtensions.JavaHttpClientCodeGenerator
extensions_dir=$(HOME)/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/

.PHONY: install archive all

all: JavaHttpClientCodeGenerator.js node_modules

node_modules:
	npm install 
 
JavaHttpClientCodeGenerator.js: JavaHttpClientCodeGenerator.ts node_modules
	tsc

install: JavaHttpClientCodeGenerator.js
	mkdir -p "$(extensions_dir)$(identifier)/"
	cp README.md JavaHttpClientCodeGenerator.js LICENSE "$(extensions_dir)$(identifier)/"

archive: all
	rm -Rf ./build/ 
	mkdir -p "./build/$(identifier)"
	cp README.md JavaHttpClientCodeGenerator.js LICENSE "./build/$(identifier)"
	cd ./build/; zip -r javaHttpClientGenerator.zip "$(identifier)/"
