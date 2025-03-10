Enumerations
==============

Several objects created as constants via the `Object.freeze() <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze>`_ method
are provided as enums.


Page types
------------------------
Enumerations describing the current page type. This can be used to abort on non-applicable pages or
use a conditional logic on different pages.

Top pages
^^^^^^^^^^^^^

Corresponds to top-level pages that are not themselves inside of a thread or discussion.

Namespace
""""""""""""""""""""""""""""
   .. js:attribute:: Mbin

Members
""""""""""
.. rst-class:: enum, nolink
.. js:attribute:: Member type

   int

.. rst-class:: enum, member-1
.. js:attribute:: TOP

   Top thread index

.. rst-class:: enum, member-2
.. js:attribute:: SEARCH

   Magazine search page

.. rst-class:: enum, member-3
.. js:attribute:: MAGAZINES

   Magazines index

.. rst-class:: enum, member-4
.. js:attribute:: PEOPLE

   People

.. rst-class:: enum, member-5
.. js:attribute:: BOOKMARKS

   Bookmarks

.. rst-class:: enum, member-6
.. js:attribute:: TAG

   Tags

.. rst-class:: enum, member-7
.. js:attribute:: MICROBLOG

   Microblogs

.. rst-class:: enum, member-8
.. js:attribute:: SETTINGS

   User settings

.. rst-class:: enum, member-9
.. js:attribute:: MAGAZINE

   A specific magazine/community


Messages
^^^^^^^^^^^

Corresponds to user-to-user message pages.

Namespace
""""""""""""
   .. js:attribute:: Mbin.Messages

Members
""""""""""""
.. rst-class:: enum, nolink
.. js:attribute:: Member type

   int

.. rst-class:: enum, member-10
.. js:attribute:: INBOX

   The conversations index.

.. rst-class:: enum, member-11
.. js:attribute:: NOTIFICATIONS

   Notifications of incoming conversations, including messages within conversations.

.. rst-class:: enum, member-11
.. js:attribute:: THREAD

    A threaded conversation between two users.

User
^^^^^^^^^^^

Corresponds to pages inside of a specific user's profile.

Namespace
""""""""""""
   .. js:attribute:: Mbin.User

Members
""""""""""""
.. rst-class:: enum, nolink
.. js:attribute:: Member type

   int

.. rst-class:: enum, member-13
.. js:attribute:: DEFAULT

   The user's main profile page.

.. rst-class:: enum, member-14
.. js:attribute:: DIRECT_MESSAGE

   A page for initiating a direct message to the user.

.. rst-class:: enum, member-15
.. js:attribute:: SUBSCRIPTIONS

   The user's subscriptions (only visible to self).

.. rst-class:: enum, member-16
.. js:attribute:: THREADS

   Threads created by the user.

.. rst-class:: enum, member-17
.. js:attribute:: COMMENTS

   Comments posted by the user.

.. rst-class:: enum, member-18
.. js:attribute:: POSTS

   Posts made by the user

.. rst-class:: enum, member-19
.. js:attribute:: REPLIES

   Replies posted by the user.

.. rst-class:: enum, member-20
.. js:attribute:: BOOSTS

   Activity voted up by the user.

.. rst-class:: enum, member-21
.. js:attribute:: FOLLOWING

   Users the user follows.

.. rst-class:: enum, member-22
.. js:attribute:: FOLLOWERS

   Users following the user.

Thread
^^^^^^^^^^^

Corresponds to discussion threads inside of a magazine.

Namespace
""""""""""""
   .. js:attribute:: Mbin.Thread

Members
""""""""""""
.. rst-class:: enum, nolink
.. js:attribute:: Member type

   int

.. rst-class:: enum, member-23
.. js:attribute:: COMMENTS

   The main comments inside of a thread.

.. rst-class:: enum, member-24
.. js:attribute:: FAVORITES

   Users who favorited the thread.

.. rst-class:: enum, member-25
.. js:attribute:: BOOSTS

   Users who boosted the thread.

Domain
^^^^^^^^^^^

Corresponds to pages under a specific domain tag.

Namespace
""""""""""""
   .. js:attribute:: Mbin.Domain

Members
""""""""""""
.. rst-class:: enum, nolink
.. js:attribute:: Member type

   int

.. rst-class:: enum, member-26
.. js:attribute:: DEFAULT

   The default thread index for that domain tag.

.. rst-class:: enum, member-27
.. js:attribute:: COMMENTS

   All comments posted under that domain tag.

Load triggers
-------------------
These enumerations are passed to mods' entrypoint functions by MES and can be used
to test what caused a mod to be called. This allows you to short-circuit the script's
usual logic and, for example, only apply a settings change.

Namespace
^^^^^^^^^^
.. js:attribute:: Trigger

Members
^^^^^^^^^

.. rst-class:: enum, nolink
.. js:attribute:: Member type

   int

.. rst-class:: enum, member-1
.. js:attribute:: PAGELOAD

    On initial pageload

.. rst-class:: enum, member-2
.. js:attribute:: TOGGLE

   When the toggle button was switched, changing the mod's active state

.. rst-class:: enum, member-3
.. js:attribute:: SETTING

   If a setting within the mod was changed

.. rst-class:: enum, member-4
.. js:attribute:: MUTATION

   If a watched mutation was propagated from MES (infinite scroll, comment reply, popup expansion, etc.)

Themes
--------------------------------------
These enumerations correspond to themes applied to the Mbin interface that are provided by default.

Namespace
^^^^^^^^^^^^^^
.. js:attribute:: Theme

Members
^^^^^^^^^^^^^
.. rst-class:: enum, nolink
.. js:attribute:: Member type

   int

.. rst-class:: enum, member-1
.. js:attribute:: KBIN

   The default theme, inherited from kbin.

.. rst-class:: enum, member-2
.. js:attribute:: LIGHT

   A light mode theme.

.. rst-class:: enum, member-3
.. js:attribute:: DARK

   A dark mode theme.

.. rst-class:: enum, member-4
.. js:attribute:: SOLARIZED_LIGHT

   A light version of the Solarized theme.

.. rst-class:: enum, member-5
.. js:attribute:: SOLARIZED_DARK

   A dark version of the Solarized theme.

.. rst-class:: enum, member-6
.. js:attribute:: TOKYO_NIGHT

   An alternate dark theme with a purple cast.

Log levels
------------------
These enumerations correspond to standard log levels used with
`console.log() <https://developer.mozilla.org/ja/docs/Web/API/console/log_static>`_,
and are used in conjunction with the utility function :js:func:`log`.

Namespace
^^^^^^^^^^^^^^^^
.. js:attribute:: Log

Members
^^^^^^^^^^^^^^^

.. rst-class:: enum, nolink
.. js:attribute:: Member type

   int

.. rst-class:: enum, member-1
.. js:attribute:: LOG

    The default log level.

.. rst-class:: enum, member-2
.. js:attribute:: WARN

   A warning.

.. rst-class:: enum, member-2
.. js:attribute:: ERROR

   An error.

.. toctree::
   :caption: Enumerations
   :maxdepth: 1
   :hidden:
