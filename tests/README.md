branch-name: checks for illegal branch name
changelog: checks if CHANGELOG.md version does not match script version
dangling-newline: checks for dangling newlines in mod JS files (breaks concat_funcs)
funcs: checks for local mods missing in funcs.js and vice versa
js-lint: lints mods, main script, and funcs.js using ESLint
json-lint: checks mod manifests using jq
missing-manifest: checks for local mods missing in manifest.json and vice versa
reserved-keys: checks for reserved localStorage keys being usedin mods
same-name: checks that mod directory, script, and manifest share same name
version-bump: checks for applicable SEMVER numbering scheme based on branch name and state of VERSION file
