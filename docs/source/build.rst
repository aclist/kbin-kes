Build scripts
====================

MES ships with build tools that allow maintainers to lint, test, normalize, and finally concatenate mods
into a single manifest and functions file.

Therefore, PRs relating to new mods need not concern themselves with modifying the main MES
helper files, as these will be updated after the fact when your mod is merged.

For the purposes of local prototyping, a Bash script ``export`` is provided in the repository root.
This script provides several build options.
The main option you will probably want to use is ``5) Build local: build all files and load from local server``.

This opens a Python server on localhost that serves the files sourced in the MES ``@requires``.
It writes a series of temp files under the repository root. Replace your current MES script with the temporary one
(``kes.user.js.alt``) to load files from the local server. Once this file is loaded into your scripthandler, you can continuously
update local files, refresh the server, and see the changes on demand.

.. tip::
   If you make changes to the main MES script itself, you will need to reinstall this temp file into your scripthandler again.
