Functions
----------------------

Utility functions
^^^^^^^^^^^^^^^^^^^^

.. js:function:: addCustomCSS(css, id)

   This function is called by :js:func:`safeGM.addStyle` and should not be called directly.

   :param string css: CSS stylesheet to append to the document head.
   :param string id: unique ID used to later remove the stylesheet.
   :rtype: undefined

.. js:function:: clearLoader(id)

   Removes a named stylesheet previously created with :js:func:`makeLoader`.

   :param string id: unique ID of the stylesheet
   :rtype: undefined

.. js:function:: genericXMLRequest(url, callback)

   This is a further abstraction of :js:func:`safeGM.xmlhttpRequest`
   intended for when you only need to perform a generic GET request on a remote page to retrieve it.
   This utility function obviates the need to set up an object, as properties are pre-filled. (See function definition below)

   If you need to perform a POST request or pass more granular parameters, you should use :js:func:`safeGM.xmlhttpRequest` itself.

   :param string url: The URL to perform a GET request on.
   :param function callback: the function to call when the request completes.
   :rtype: undefined

.. code-block:: javascript

   function genericXMLRequest (url, callback) {
        safeGM("xmlhttpRequest", {
            method: 'GET',
            url: url,
            onload: callback,
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "text/xml"
            }
       });
   }

.. js:function:: getComputedFontSize(string)

   Converts font point sizes defined in the JSON manifest into integers if they are string literals.
   This function is used internally by MES and should not be called directly.

   :param string string: font size as a string; may be an int depending on how the JSON was parsed
   :returns: integer-denominated point size
   :rtype: int

.. todo::
   This function is going to be dropped in version 5.0.0 in favor of calling `parseFloat() <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat>`_ directly.

.. js:function:: getHex(value)

   Converts internal Mbin theme variable names to hex color values.
   If the value is itself a hex code, simply returns it back.

   :param string value: string literal variable name or hex color code
   :returns: The resolved hex string.
   :rtype: string

.. js:function:: getModSettings(namespace)

   Used to retrieve namespaced settings from localStorage for a mod, if it exposes discrete
   settings other than toggle ON/OFF. See :ref:`JSON manifest`.

   :param string namespace: the fully qualified namespace used by the mod.
   :returns: localStorage object containing the mod's settings
   :rtype: object

.. js:function:: getPageType()

   Uses `window.location <https://developer.mozilla.org/en-US/docs/Web/API/Window/location>`_ to parse the current Mbin page type. See :ref:`Page types`.

   :returns: The enumerated page type.
   :rtype: int

.. js:function:: getTheme()

    Parses the className of the document body to find the currently loaded Mbin theme. See :ref:`Themes`.

    :returns: The enumerated theme type.
    :rtype: int

.. js:function:: isIndex()

    Tests whether the page is :js:attr:`Mbin.TOP<TOP>`,
    :js:attr:`Mbin.Domain.COMMENTS<COMMENTS>`,
    or :js:attr:`Mbin.Domain.DEFAULT<DEFAULT>`.

   :rtype: bool

.. js:function:: isLoggedIn()

   Parses the navbar to test whether the user is currently logged in.

   :rtype: bool

.. js:function:: isThread()

   Tests whether the page is :js:attr:`Mbin.Thread.COMMENTS<COMMENTS>`
   :js:attr:`Mbin.Thread.FAVORITES<FAVORITES>`, or :js:attr:`Mbin.Thread.BOOSTS<BOOSTS>`.

   :rtype: bool

.. js:function:: loadMags(callback, ns, useCache=false, runCallBackOnlyOnce=false)

    Loads the current user's subscriptions.
    Will first attempt to load them from the sidebar, if available. When they are not in the sidebar,
    or the user has more subscriptions than fit into the sidebar, the user's profile is queried
    instead (which may take a while).

    Even if the full list has to be fetched from the profile, the sidebar is still loaded first
    to provide some early results. This can be skipped by using the ``runCallbackOnlyOnce``

    :param function() callback: name of the function receiving the return data (full names and instances of the user's subscriptions)
    :param string ns: a namespace used for the cancellation key (ideally the mod's name)
    :param bool useCache: whether the cached result should be used
    :param bool runCallbackOnlyOnce: workaround for mods that aren't optimized for running the callback twice. When true, the callback is only executed once when all mods are loaded.

    :rtype: void

.. js:method:: loadMags.cancel(ns)

   Cancels :js:func:`loadMags` after running it.
   This is intended to be used on teardown of a mod, to prevent the callback from being called when the mod is supposed to be disabled.

   :param string ns: the mod's cancellation namespace as supplied to :js:func:`loadMags`.

.. js:function:: log(msg, level)

    Prints messages to the browser console using `console.log() <https://developer.mozilla.org/ja/docs/Web/API/console/log_static>`_,
    and simultaneously pushes event notifications into the debugbar panel if it is enabled.

    :param string msg: Message to print to the console.
    :param enum level: Log level of the message. See :js:attr:`Log`

    :rtype: undefined

.. js:function:: makeLoader(id, text)

   Creates a loading modal with spinner that prints the given message.

   :param string id: a unique ID prepended to the element's id and classes.
   :param string text: the loading message to print. Messages are prefaced with the string ``MES:``

   :returns: a div containing the loading modal
   :rtype: HTMLElement

.. js:function:: makeModal(id)

   Creates a generic centered modal that can be used to display content.

   :param string id: a unique ID prepended to the element's id and classes.

   :returns: a div containing the modal
   :rtype: HTMLElement

.. js:function:: removeCustomCSS(id)

   Removes stylesheets added to the document head by :js:func:`addCustomCSS`.
   This function is called by :js:func:`safeGM.removeStyle` and should not be called directly.

   :param string id: ID of the stylesheet to remove.
   :rtype: undefined

safeGM
^^^^^^^^^^^^^^^^

This is a wrapper around Greasemonkey's internal API.

Because different scripthandlers use different versions of the Greasemonkey API, there is no guarantee
that a mod making bare API calls in one format (``GM.<method>`` or ``GM_<method>``) will work in the user's scripthandler.

Mainline Greasemonkey uses the dot notation, whereas some (but not all) other scripthandlers use the underscore notation.
These represent different but similar APIs, and their methods do not always have the same names.

For this reason, safeGM acts as a generic entrypoint that MES and mods can call that is agnostic as to the user's scripthandler.

In addition, it has an intentionally reduced scope, only exposing support for specific API functions deemed necessary for mods.
In the context of MES, calling safeGM is thus a safer, simpler, and more cross-platform compatible approach.

.. js:module:: safeGM

.. js:method:: addStyle(css, id)

    Adds a stylesheet to the document head.

   :param string css: the stylesheet
   :param string id: a unique ID used to later remove the stylesheet
   :rtype: undefined

.. js:method:: info()

   Retrieves internal Greasemonkey properties.

   :returns: scripthandler internal metadata
   :rtype: object

.. js:method:: getResourceText(id)

   This method is used internally by MES and should not be called directly.

   Accesses the text of a resource retrieved via a ``@resource`` header in the main script masthead.

   :param string id: the name of the resource as defined previously in the masthead
   :returns: the internal text of the resource
   :rtype: string

.. js:method:: getValue(property)

    Retrieve some named value from the Greasemonkey storage previously set with :js:func:`safeGM.setValue`.

    This method is asynchronous and should be invoked with
    `await <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await>`_.

    :param string property: name of the property to fetch
    :returns: contents of the requested value
    :rtype: Promise

.. js:method:: removeStyle(id)

    Removes a named stylesheet previously added via :js:func:`safeGM.addStyle`

   :param string css: the unique ID of the stylesheet
   :rtype: undefined

.. js:method:: setValue(id, value)

   Saves a value to the internal Greasemonkey storage under a named id.

   :param string id: the unique name for the value to be saved
   :param value: string, int, or bool
   :rtype: undefined

.. js:method:: xmlhttpRequest(details)

   Greasemonkey's custom implementation of XMLHttpRequest with CORS support.

   It is generally not necessary to call this directly if you are just fetching a remote page; prefer using :js:func:`genericXMLRequest`.
   If you need to retrieve something other than XML, you can still use this method.

   :param object details: object encapsulating the details of the request. Refer to the `Greasemonkey documentation <https://wiki.greasespot.net/GM.xmlHttpRequest>`_ for available properties.
   :rtype: undefined
