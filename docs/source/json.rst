JSON manifest
-------------------------
Each mod requires a manifest with a basename that is identical to the mod's fully qualified name.
If the mod's root directory is ``mymod``, then the mod and manifest should respectively be named ``mymod.js`` and ``mymod.json``.

The manifest is where you define where in MES your mod will reside, what options it exposes, various human-readable labels and descriptions, etc.

These definitions set up the settings UI for your mod automatically and is where you will check user settings and preferences when the mod is called.

Importantly, the namespace you set defines where in the MES ``localStorage`` object all of the mod's settings will be saved.

.. seealso::
   Within the context of a script's runtime, you can also use :js:func:`safeGM.setValue` to save ad-hoc data.

JSON schemas
================
Properties in bold are required.

.. jsonschema:: _static/schemas/manifest.json

Available field types are:

- :ref:`checkbox <Subschema - Checkbox>`
- :ref:`color <Subschema - Color>`
- :ref:`number <Subschema - Number>`
- :ref:`range <Subschema - Range>`
- :ref:`select <Subschema - Select>`
- :ref:`text <Subschema - Text>`

.. jsonschema:: _static/schemas/checkbox.json

The above schema is used when inserting input elements of type `checkbox <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox>`_.

.. jsonschema:: _static/schemas/color.json

The above schema is used when inserting input elements of type `color <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color>`_.

.. jsonschema:: _static/schemas/number.json

The above schema is used when inserting input elements of type `number <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number>`_.

.. jsonschema:: _static/schemas/radio.json

The above schema is used when inserting input elements of type `radio <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio>`_.

There can only be one radio option within a grouped array selected at a given time.

.. jsonschema:: _static/schemas/range.json

The above schema is used when inserting input elements of type `range <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range>`_.

.. jsonschema:: _static/schemas/select.json

The above schema is used when inserting elements of type `select <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select>`_.

There can only be one select option within a grouped array selected at a given time.

.. jsonschema:: _static/schemas/text.json

The above schema is used when inserting input elements of type `text <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text>`_.
