Troubleshooting
==========================

Submitting a ticket
--------------------------

Tickets are tracked at the `MES issue tracker <https://github.com/aclist/kbin-kes/issues>`_.

You will need to `register for a GitHub account <https://github.com/signup>`_ in order to submit one.

If have checked the `closed issues <https://github.com/aclist/kbin-kes/issues?q=is%3Aissue+is%3Aclosed>`_ area and did not find a solution, three ticket types are provided for your convenience:

- **Bug report**: for unexpected, unintended, or breaking behavior in the application
- **Feature request**: to propose new functionality with MES itself
- **Add-on request**: to propose an add-on to use within MES

Tickets must be in abidance with the `code of conduct <https://github.com/aclist/kbin-kes/main/CODE_OF_CONDUCT.md>`_.

Reports by example
--------------------------

Below are some examples of how to format a constructive report that will ensure your problem can be resolved in a timely fashion.

A non-actionable report
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: console

    Bug: add button

    hi, you must add a button to download a PDF, the app is useless without this...do your job, guys!!! ;-)


This report exhibits a number of problems:

- Vague title and summary: in addition to being unclear, this will slow down filing the incoming report.
- Problem space is poorly defined: it is not clear where the issue lies, where the feature is supposed to be implemented, nor why.
- Lack of context: the feature may already exist, but there is not enough information to go on. Alternatively, the feature may be technically impossible to implement, but there is not enough 
  information to go on.
- Incorrect report type: this is a feature request filed as a bug report.
- Unprofessional tone: the message is disrespectful towards project members and inserts the user's subjective opinion.

An actionable report
^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: console

    Bug: Toggle switch stopped working in version 4.5.0

    This occurs specifically on version 4.5.0 if the feature "hide images" is set to ON. When trying to turn the feature off again,
    the button stops responding. I was able to reproduce it using the following steps:

    Browser: Firefox
    
    - Ensure that "hide images" is set to ON
    - Open the main menu and immediately navigate to "hide images", then try to set it to OFF
    - The toggle button will animate but not actually switch to the OFF state

    See the attached log output for details. Thanks for looking into this.

This report is actionable because it is objective, specific, and detailed:

- The subject is clearly defined: specific details ensure it will be filed in a timely manner.
- Scope is explicit: the specific version, settings, and conditions under which the problem occur were given.
- Ample context: the user gave steps to reproduce the problem and clarified each one.
- Courteous tone: the user interacted with project members in a professional manner.
- Supporting information: the user provided a log to expedite resolution of the issue.
