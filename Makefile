# sh <(curl https://create.tauri.app/sh)

.PHONY: help

default: help

help: ## Show this menu
	@printf "Available commands:\n\n"
	@sed -rn "s/^([%a-zA-Z0-9-]+):.*+##\s+(.*)$\/\1??\2/p" $(MAKEFILE_LIST) \
	| sort \
	| column -t -s '??'

include wails-svelte/Makefile
include .tauri.mk