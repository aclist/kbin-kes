
![Alt text](/examples/mm2.png)

# Note to end users

This tool is not ready for mainstream consumption yet.

# Developers

## Adding a script

1. Add the script to the /mods directory
2. Add the script's absolute path to the includes (`@require`)
3. Update manifest.json with appropriate values
4. Update funcObj with string=>function mappings
5. Add necessary @grants to megamod.user.js
6. Submit a PR

## Specifications

- Prefer 4 space indentation
- Prefer [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Script entry point must accept a boolean toggle (true = setup, false = teardown)


## TODO
- Update this README
- Specify if option requires login


