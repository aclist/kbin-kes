Usage
==================
The MES main menu is accessed via the wrench icon :fa:`fa-solid fa-wrench` on the top-right of the Mbin navbar,
or via the ``Ctrl-Shift-?`` keybinding.

Main menu legend
^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 5 15 50 20
   :header-rows: 1

   * - Icon
     - Name
     - Description
     - Location
   * - :fa:`fa-solid fa-search`
     - Search
     - Search for add-ons by name. You can also open this prompt with the shortcut ``Ctrl-Shift-F``. See :ref:`Search dialog`
     - Header
   * - :fa:`fa-solid fa-flask`
     - Changelog
     - Open the changelog on GitHub
     - Header
   * - :fa:`fa-solid fa-eye-slash`
     - Transparent Mode
     - Hides the MES menu so that you can "see through" to the rest of the page and inspect how changes were applied.
       Click anywhere on the screen to revert to the KES menu.
     - Header
   * - :fa:`fa-solid fa-arrow-down`
     - Docked Mode
     - Open the changelog on GitHub
     - Header
   * - :fa:`fa-solid fa-times`
     - Close
     - Open the changelog on GitHub
     - Header
   * - :fa:`fa-solid fa-clipboard`
     - System info
     - Copies system info to clipboard. \*See note below
     - Footer
   * - :fa:`fa-solid fa-heart`
     - Donation
     - Donate to the developer. Links to the project's GitHub Sponsors page.
     - Footer

.. note::
    Copying to clipboard captures the following information. You can provide it when submitting a :ref:`bug report<Submitting a ticket>`.

   - Operating system
   - User agent (identifies the type of browser)
   - MES version number
   - Script handler (Greasemonkey, TamperMonkey, etc.)
   - Incognito: whether private browsing is on (used to troubleshoot issues)
   - Settings: the currently saved MES settings, such as which options are on, and what settings they have

Navigation
^^^^^^^^^^^^^^^^^^
MES basically consists of three columns. From left to right, those are:

- **Sidebar**: lists clickable contexts for different features
- **Add-ons list**: shows clickable add-ons applicable to the chosen context.
- **Helpbox**: shows detailed toggles and settings for the chosen add-on.

Click a context, then click on an add-on by name, and finally enter the helpbox on the right.

From there, you can enable/disable the add-on via the toggle at the top, read a description of the feature,
and optionally customize different settings the add-on provides, if applicable.

The toggle state (on/off) of the add-on and the settings you chose are saved and persist.

When you enable an add-on, it will always apply on subsequent page reloads and recurring events (infinite scroll, etc.).
Similarly, when you change an add-on's settings or toggle it off, those changes will take place immediately on the page.

.. note::
   In very rare cases, you may have to reload the page for a particular add-on to be disabled.
   The add-on will list specific instructions to that effect.

If you want to immediately see how a feature changed the content onscreen, you can enable **Transparent Mode** to see behind the MES menu.
See the :ref:`Main menu legend` for details.

Finally, the last context/page you visited in the MES menu is saved on exit, letting you reopen the menu
to the same page later on.


Search dialog
^^^^^^^^^^^^^^^
The search button opens a small dialog with a search field.

Use this field to search for and auto-jump to the page for a particular add-on matching your keyword.
Partial search is supported. If there are multiple matches, you will be presented with a list.

You can also use the button at the top of the search dialog to see a list of add-ons newly added
in the current version of MES. This can be a quick way of getting up to date on notable changes.

Settings dialog
^^^^^^^^^^^^^^^^^
The settings menu in the footer opens a small dialog that provides the below options:

- **Export**: saves your MES preferences for each add-on into a backup file (.json).
- **Import**: loads a .json file previously saved with the export option and applies its settings.
- **Reset**: resets all MES settings to their default. This action is destructive.
- **Debug bar**: mainly intended for developers. See :ref:`Debug bar`.
- **Close**: closes the menu.

