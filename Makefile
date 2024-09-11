# sh <(curl https://create.tauri.app/sh)

.PHONY: help

default: help

help: ## Show this menu
	@printf "Available commands:\n\n"
	@sed -rn "s/^([%a-zA-Z0-9-]+):.*+##\s+(.*)$\/\1??\2/p" $(MAKEFILE_LIST) \
	| sort \
	| column -t -s '??'

init: ## initialize a project
    # cargo install tauri-cli
    # cargo install create-tauri-app --locked
	cargo create-tauri-app

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
tauri-deps: _tauri-% ## install and remove files

%-ui-deps: ## install UI dependencies
	cd $(@:-ui-deps=) && npm i

.ONESHELL:
%-build: ## build golang package
	cd $(@:-build=)
	@npm run tauri build
	@echo
	@echo "Showing build folder"
	cd src-tauri/target/release

%-installers: ## show installers folders
	cd $(@:-installers=)/src-tauri/target/release/bundle

%-run: ## execute builded package
	cd $(@:-run=) && npm run tauri dev

%-run-ui: ## execute ui only
	cd $(@:-run-ui=) && npm run dev
