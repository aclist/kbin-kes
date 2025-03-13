Contributing
===================
If you wish to contribute a userscript ("mod") to MES, a simple and declarative framework and utility API are provided.

Basic workflow
--------------
PRs should be made against the ``testing`` branch.

Mods should be atomic and focus on a single feature, but they may expose additional settings and options to modify that feature's behavior.

A mod consists of a directory placed under ``mods/``, the JS script itself, and a :ref:`JSON manifest`.

.. code:: console

    mods/
      └─mymod/
                ├── mymod.js
                └── mymod.json

.. caution::
   Your mod must have a fully qualified name that does not collide with existing mods.

See the :ref:`API reference <Functions>` for implementation details.

Also refer to the file ``CONTRIBUTING.md`` in the repository root,
as it may contain other information not in this documentation.

Precautions and best practices
-------------------------------

Encapsulation
^^^^^^^^^^^^^^^^^^
Encapsulate the script's logic in a single function and use local variables within it. MES ingests all script functions together into its scope.

Your function should be designed to support the parameters below when called by MES.

.. js:function:: myOuterFunc(toggle, trigger, extra)

   :param bool toggle: the toggle state of the mod (``true`` means ON)
   :param int trigger: enum corresponding to :ref:`Load triggers`
   :param object extra: if the trigger is of type :js:attr:`Trigger.MUTATION<MUTATION>`, the `MutationObserver <https://developer.mozilla.org/ja/docs/Web/API/MutationObserver>`_ object. If the trigger is of type :js:attr:`Trigger.TOGGLE<TOGGLE>` or :js:attr:`Trigger.SETTING<SETTING>`, this will instead be a stringwise representation of the localStorage key.

.. note::
   In the case of :js:attr:`Trigger.TOGGLE<TOGGLE>`, the last parameter ``extra``
   will be the reserved key ``state``, which returns a boolean value when you parse the localStorage for that key.
   This is functionally equivalent to the first parameter, ``toggle``, which also holds the state.

At a minimum, a mod will need to:

- Test whether it was toggled on or off
- Implement some setup logic
- Implement some teardown logic to reverse the process

See :ref:`Setup and teardown` for more details.

It is generally not recommended to source settings from other mods, but there may be synergistic behavior you can find.

.. caution::
   Do not modify and save settings on behalf of another mod, such as by using its namespace.

No Greasemonkey headers
^^^^^^^^^^^^^^^^^^^^^^^^
Mods are not userscripts. From the standpoint of MES, they are encapsulated functions that MES calls when necessary.
There is no need to include additional masthead ``@requires`` or ``@grants``, as this functionality is already provided out of the box by MES.

jQuery support is also provided, along with the utility functions described in the API reference and :ref:`safeGM`, which should be
your main entrypoint for calling internal Greasemonkey API functionality.

Finally, a number of popular Mbin instances are whitelisted by default in the ``@includes``.

.. note::
   If you find that the ``@requires`` or ``@grants`` provided by MES are not sufficient, please :ref:`open a ticket<Submitting a ticket>`.


Setup and teardown
^^^^^^^^^^^^^^^^^^^^
When your mod is called by a :ref:`trigger event<Load triggers>`, its logic will be applied if the ``state`` key in ``localStorage`` is ``true``.
Therefore, your mod will need conditional branches that either apply the mod if its state is ``true`` or unapply it if ``false``.

Optionally, you can test the incoming trigger type--this can be especially useful if the user changed a setting within the mod
and a cosmetic change needs to be applied to the page without walking through the entire setup process again.

Note that additional mutation events like infinite scrolling, replying to a comment, or popup notifications may
trigger a mod to be called again. For this reason, you should include logic to abort the setup step if the requested elements already exist on the page.

When a mod is asked to be toggled off, some teardown logic must reverse the setup process and restore the page to its original state.
This includes restoring elements' attributes, removing injected elements, and detaching stylesheets.

A simple example of a script with setup and teardown logic follows:

.. code:: console

   function myModEntrypoint(toggle, trigger, meta) {

       function applyMyMod(mutation) {
           const existingEl = document.querySelector(".myElement");
           //abort if existing
           if (existingEl) return
           //only apply on mutation
           if (mutation) {
               const myEl = document.createElement("div")
               myEl.className = myElement
               mutation.target.appendChild(myEl)
               return
           }
           //first-time invocation
           document.querySelectorAll(".someEl").forEach((el) => {
               const newEl = document.createElement("div")
               newEl.className = myElement
               el.appendChild(newEl)
           });
       }

       function removeMyMod() {
           safeGM.removeStyle("myCSS");
           document.querySelectorAll(".myElement").forEach((el) => {
               el.remove();
           }
       }

       function changeSetting(setting) {
           const myEls = document.querySelectorAll(".myElement");
           const settings = getModSettings("myModNamespace")
           const userColor = settings[setting]
           myEls.forEach((el) => {
               el.color = color
           });
       }

       switch (trigger) {
           case Trigger.PAGELOAD:
               applyMyMod();
               break;
           case Trigger.TOGGLE:
               (toggle) ? applyMyMod() : removeMyMod():
               break;
           case Trigger.SETTING:
               changeSetting(meta);
               break;
           case Trigger.MUTATION:
               applyMyMod(meta);
               break;
       }
   }

Event listeners and mutation observers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Unless you are creating a special button or widget triggering on a specific signal like clicks, there is generally no need to actively watch the page for changes (like onload or mutation events).
MES watches for changes to specific areas on the page where recurring changes can occur (threads, comments, popups, etc.) and will propagate them to your script if necessary.

.. caution::
  If attaching event listeners to an element, bear in mind that your function will go out of scope once MES finishes applying it,
  so refences to previous listeners and their attached functions will be stale. You should therefore avoid attaching listeners to
  elements already on the page, as you will be unable to detach those later. Instead, attach listeners to newly injected elements,
  and remove the entire element during teardown.

Theming
^^^^^^^^^^^^^^
If changing colors on a page, it is best to respect Mbin’s internal themes by using the variables provided.
These can be explored under the ``var(--kbin-)`` prefix. A number of variables for success, alerts, backgrounds, text, hover, etc. are provided.
These map to different colors within the theme a user has selected. If you hardcode an element to a specific color, there is a high likelihood it
will not be visible on a dark or light theme, respectively.

Similarly, do not set fonts verbatim, but use ``var(--kbin-body-font-family)`` for a set of fallback fonts.

Refer to :js:func:`getHex` for details on how to convert color abstractions into hex codes.

.. seealso::
    :js:func:`getTheme`

Saving persistent settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If your mod exposes settings for the user to configure within MES, you will need to set a unique namespace that can be
queried via :js:func:`getModSettings`. These settings are saved to ``localStorage`` and can be retrieved later.

Depending on the setting the user selected, your script should take different actions, such as customizing a color or label accordingly.

See the :ref:`JSON manifest` section for further details on namespaces.

Alternatively, you can manipulate ad-hoc data not relating to user preferences via :js:func:`safeGM.setValue` and :js:func:`safeGM.getValue`.


Conventions
^^^^^^^^^^^^^^^^^
Refer to ``.eslintrc`` in the repository root for code style conventions. You can run `ESLint <https://eslint.org/>`_ against your files to test their conformity.

