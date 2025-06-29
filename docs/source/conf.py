# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'MES'
author = 'aclist'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = []

templates_path = ['_templates']
exclude_patterns = []



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

#html_theme = 'alabaster'
extensions = [
    'sphinx_rtd_theme',
    'sphinx_copybutton',
    'sphinx_fontawesome',
    "sphinx-jsonschema",
    "sphinx_new_tab_link",
    "sphinx.ext.autosectionlabel",
    "sphinx.ext.todo",
    "sphinx.ext.githubpages"
]

todo_include_todos = True
toc_object_entries = False

html_theme = "sphinx_rtd_theme"
html_static_path = ['_static']
html_show_sphinx = False
html_show_copyright = False
html_show_sourcelink = False

html_css_files = [
    'css/custom.css',
]

today_fmt = "%Y-%m-%d"
release = "5.x.x"
version = "5.x.x"
