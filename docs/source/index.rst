MES documentation (|release|)
=================================
Last update: |today|

Source code: `GitHub <https://github.com/aclist/kbin-kes>`_

What this is
----------------
MES (Mbin Enhancement Suite) provides a collection of third-party modifications to Mbin and an interface for managing them. These add-ons can be used to override certain behavior, apply custom 
styling, and add non-existent features.

As such, MES is three things:

- A curated and audited collection of modifications (userscripts)

- A menu for managing this collection of modifications

- A framework for authors to add new modifications

For users, it provides a "single pane of glass" from which to manage various usability/customization options.

For script authors, it provides a simple, declarative framework to integrate new options with minimal overhead.

.. note::
    Modifications are variously referred to as "add-ons", "mods", and "userscripts."


Installation/Uninstallation
--------------------------------
See: :doc:`installation`.

Usage
---------------
See: :doc:`usage`.

Troubleshooting
----------------
See: :doc:`bugs`.

Developers
---------------
See: :doc:`contributing`.

.. toctree::
   :maxdepth: 3
   :hidden:

   self

.. toctree::
   :caption: Setup
   :maxdepth: 3
   :hidden:

   installation
   usage
   updating
   uninstallation

.. toctree::
   :caption: Help
   :maxdepth: 3
   :hidden:

   bugs

.. toctree::
   :caption: Developers
   :maxdepth: 3
   :hidden:

   contributing
   build
   debug

.. toctree::
   :caption: API reference
   :maxdepth: 2
   :hidden:

   funcs
   enums
   json
