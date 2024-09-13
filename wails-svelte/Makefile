DIR := $(dir $(lastword $(MAKEFILE_LIST)))

wails-dev: ## run as dev
	wails dev

wails-new: ## new wails application
	go install github.com/wailsapp/wails/v2/cmd/wails@latest
	go install github.com/goreleaser/nfpm/v2/cmd/nfpm@latest
	wails init -n ${PROJECT_NAME:-example} -t svelte-ts

wails-build: ## build project
	wails build

wails-ship-debian: ## build debian
	cd $(DIR)build/debian && nfpm pkg --packager deb --target ../bin