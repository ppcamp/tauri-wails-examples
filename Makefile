default: help

.PHONY: help

# sh <(curl https://create.tauri.app/sh)

UBUNTU_FOCAL_FIXER = Types: deb \n\
					 URIs: http://archive.ubuntu.com/ubuntu \n\
					 Suites: focal \n\
					 Components: main restricted \n\
					 Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
UBUNTU_FIXER_FILE = /etc/apt/sources.list.d/tauri.sources
F=ui
RELEASE_FOLDER=$(F)/src-tauri/target/release


help: ## Show this menu
	@printf "Available commands:\n\n"
	@sed -rn "s/^([a-zA-Z0-9-]+):.*+##\s+(.*)$\/\1??\2/p" $(MAKEFILE_LIST) \
	| sort \
	| column -t -s '??'


install-dependencies-ubuntu: ## dependencies to build package
	@sudo apt install libgl1-mesa-dev xorg-dev

install-dependencies-fedora: ## dependencies to build package
	@sudo apt install libX11-devel libXcursor-devel libXrandr-devel \
		libXinerama-devel mesa-libGL-devel libXi-devel libXxf86vm-devel

_tauri-deps-add: ## update source list for ubuntu 24
	sudo printf $(UBUNTU_FOCAL_FIXER) > $(UBUNTU_FIXER_FILE)
	sudo apt update -y
_tauri-deps-remove: ## update source list for ubuntu 24
	sudo rm $(UBUNTU_FIXER_FILE)
	sudo apt update -y
_tauri-install-deps: _tauri-deps-add ## install tauri dependencies for ubuntu
    # https://tauri.app/v1/guides/getting-started/prerequisites
	sudo apt install pkg-config \
		libdbus-1-dev \
		libgtk-3-dev \
		libsoup2.4-dev \
		libjavascriptcoregtk-4.0-dev \
		libwebkit2gtk-4.0-dev
tauri-deps: _tauri-install-deps _tauri-deps-remove ## install and remove files

ui-deps: ## install UI dependencies
	cd $(F) && npm i --verbose

deps: ui-deps tauri-deps ## install all required dependencies

build: ## build golang package
	cd $(F) && npm run tauri build --verbose
	@echo
	@echo "Showing build folder"
	cd $(RELEASE_FOLDER)

installers: ## show installers folders
	cd $(RELEASE_FOLDER)/bundle

run: ## execute builded package
	cd $(F) && npm run tauri dev

run-ui: ## execute ui only
	cd $(F) && npm run dev

init: ## initialize a project
    # cargo install tauri-cli
    # cargo install create-tauri-app --locked
	cargo create-tauri-app
