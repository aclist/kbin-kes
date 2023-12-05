## Ticket/issue number this solves (if applicable)

E.g., #3

## What's added/changed

Clarify what this PR adds or changes. You can include screenshots, videos, or detailed explanations.

If this PR introduces additional dependencies or changes the underlying framework, explain the rationale.

## To-do list/next steps

List any pending issues, cosmetic or otherwise, that this patch still needs, or future considerations.

E.g.,

- [ ] Test mobile functionality
- [ ] Some cosmetic issues with themes
- [ ] Expand functionality of XXX

## Checklist

Before submission, verify that you checked the below. If complete, tick the box.

Patches to KES itself:
- [ ] ESLint did not produce any errors

Add-ons (mods):
- [ ] A directory containing the add-on's JS code and a standalone JSON manifest containing metadata, both prefixed with the same name, was included
- [ ] The PR does not modify KES files other than those within its own directory.
- [ ] If calling GM functions, [safeGM](https://aclist.github.io/kes/kes.html#_compatibility_api) was used
- [ ] If the add-on recurs when contents update, it does not call its own mutation observers (this is handled by KES)
- [ ] The add-on has a clearly defined entry point function, and this function is listed by name in the manifest
- [ ] Some explicit toggle logic handles both TRUE and FALSE states (setup and teardown) and reverts the page to its prior state
