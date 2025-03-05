Thank you for your interest in contributing to this project. Below are some basic guidelines and instructions.

# Mods (scripts)
Mods should focus on atomic features and do one thing well. If there is a need for multiple options within a mod, expose those via the JSON manifest to create granular settings.

Mods should do not call other mods. If you are finding a need to call another mod from within a mod, this likely indicates a need for splitting that functionality into a public helper function 
accessible to all mods.

Mods are invoked in serial fashion by MES and their logic is walked through. Mods should not modify the main MES modal or MES itself.

Because mods are ingested into MES as functions, the entire script should be wrapped in an entry function and be devoid of GreaseMonkey headers or other markup. Once adapted to the MES framework, mods are not intended to be run as standalone scripts.

# API
Please refer to the [API reference](https://aclist.github.io/kes/kes.html#_api_reference).

# Conventions
Refer to and use the .eslintrc file in the root directory for code conventions.

# Best practices
Please refer to [precautions and best practices](https://aclist.github.io/kes/kes.html#_precautions_and_best_practices).

# Submitting a PR
PRs should be made against the `testing` branch.

Please refer to the [developers section](https://aclist.github.io/kes/kes.html#_developers) of the documentation.

If you need to show an example of the page the mod affects, please include a real link from an active instance,
as searching for specific pages/threads with that behavior can be time-consuming after the fact.

By submitting a PR, you acknowledge that your contribution becomes part of the project and is subject to the [MIT license](https://raw.githubusercontent.com/aclist/kbin-kes/refs/heads/main/LICENSE).
Your contribution may be modified at will by project maintainers at a later date.
