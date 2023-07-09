
![Alt text](/examples/mm2.png)

# Note to end users

This tool is not ready for mainstream consumption yet.


TODO: point to external documentation

# Developers
## Adding a script

1. Fork and work against the `testing` branch
2. Add the script to the /mods directory
3. Add the script's absolute path to the includes (`@require`)
4. Update manifest.json with appropriate values
5. Update funcObj with string=>function mappings
6. Add necessary @grants to megamod.user.js
7. Submit a PR
8. After acceptance and integration testing, mod is merged into the `main` branch

Input fields must be of type defined here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

## Specifications

- Prefer 4 space indentation
- Prefer [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Script entry point must accept a boolean toggle (true = setup, false = teardown)
