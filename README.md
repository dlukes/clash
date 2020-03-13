# Clash

This is currently just a collection of thoughts and ideas towards implementing
an object-oriented corpus manager (*object-oriented* as in "exposing the results
of query and analysis functions provided by the graphical interface as objects
which can be accessed and manipulated by users, either via other predefined GUI
operations or custom code").

**Clash** stands for **C**orpus **L**inguistics **A**dvanced **Sh**ell.

## Architecture

Built from scratch or on top of [JupyterLab][lab]? The latter is probably
easier. Built as an extension to JupyterLab or as a fork thereof? That's a
harder decision to make. An extension makes it easier to get updates to core
code. Forking would allow us to modify the GUI to be newbie friendly (i.e. no
file browser, no commands, no tabs, just an intuitive query interface). Though
maybe that's not needed? And maybe it can be done as a "skin" extension?

The basis: a robust Python API for accessing different corpus resources --
perhaps as an extension of NLTK, to leverage its already available capabilities
for working with plaintext corpora? At any rate, a module has to be added to
interact with manatee-indexed corpora, which should probably use a different API
than [CorpusReader][CorpusReader], because it doesn't really make sense to
require a list of `fileids` to initialize an object representing an indexed
corpus accessible via a server. Maybe `IndexedCorpus`, `CorpusConnection`,
`CorpusDb`?

Each action within the GUI corresponds to a function call. Each user will spawn
a python kernel in the background, which will run their actions. By default,
there will be predefined actions accessible via the GUI which will cover some
typical use cases and workflows, but at any point, the user will be allowed to
"shell out" into a Jupyter notebook, where all previous actions will be
available as results of individual cells (`Out[xyz]`) for custom manipulation
and code execution leveraging the full power of Python.

### Features

- a CLI version of the shell? basically, just a `clash` command which would
  launch `ipython` and import the necessary libraries; then the only other thing
  that's needed is to ensure that all functions used in the GUI also behave
  reasonably (i.e. generate useful output) when used on the command line

## Challenges

### Data persistence

We can't afford to keep an unlimited history for every user (or can we, if it's
just a json text file? how much history should be saved implicitly by default
for people who don't really even care about jumping around in it? at any rate,
it should be possible to save any given part of the history as a separate
notebook / project). Well at any rate, we can't afford to keep the python
kernels running indefinitely. How to implement this so that it doesn't jar the
intuition of casual GUI users (i.e. so that they don't expect that the result of
a previous operation will be around forever) without forcing them to explicitly
end their kernel sessions?

Also, for advanced users, it should be possible to spawn new kernels for
separate projects.

### User extensions

Users will by definition be able to extend the corpus manager by writing their
own Python code which they can load into the python kernel to perform analyses.
What would be really neat though is if the GUI functions were implemented in
such a way that users could easily add their custom routines into the GUI, along
with an auto-generated query form etc., just by editing their `.clashrc`.

### Coping with large results

The obvious (and correct) solution: generators. The problem: generators get
consumed, so that when you page through a concordance in the GUI and then access
it on the CLI, you'll continue in the middle of it. Bug or feature?

Perhaps the objects returned by the API should cache the values already yielded
for repeated access? Or maybe just warn the user that they should reinit the
object when they access it from the shell?

## Scratchpad

<https://github.com/jtpio/jupyterlab-extension-examples>, especially the
kernel-related ones.

<https://jupyterlab.readthedocs.io/en/stable/developer/extension_dev.html>

Re-usable UI elements:
<https://jupyterlab.readthedocs.io/en/stable/developer/ui_helpers.html>

References for inspiration and/or a potential paper on Clash:

- [CWB](https://www.birmingham.ac.uk/documents/college-artslaw/corpus/conference-archives/2011/Paper-153.pdf)

[lab]: https://github.com/jupyterlab/jupyterlab
[CorpusReader]: https://github.com/nltk/nltk/blob/develop/nltk/corpus/reader/api.py
