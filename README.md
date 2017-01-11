# Clash

This is currently just a collection of thoughts and ideas towards implementing
an object-oriented corpus manager (*object-oriented* as in "exposing the results
of query and analysis functions provided by the graphical interface as objects
which can be accessed and manipulated by users, either via other predefined GUI
operations or custom code").

**Clash** stands for **C**orpus **L**inguistics **A**dvanced **Sh**ell.

## Architecture

A robust Python API for accessing different corpus resources -- perhaps as an
extension of NLTK, to leverage its already available capabilities for working
with plaintext corpora? At any rate, a module has to be added to interact with
manatee-indexed corpora. Each action corresponds to a function call.

Each user will spawn a python kernel in the background, which will run their
actions. By default, there will be predefined actions accessible via a GUI which
will cover some typical use cases and workflows, but at any point, the user will
be allowed to "shell out" into a Jupyter notebook, where all previous actions
will be available as results of individual cells (`Out[xyz]`) for custom
manipulation and code execution leveraging the full power of Python.

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

## Scratchpad

Flask at scale (Miguel Grinberg): <https://youtu.be/tdIIJuPh3SI?t=1h25m8s>

Flask for fun and profit (Armin
Ronacher): <https://www.youtube.com/watch?v=1ByQhAM5c1I>. See in particular how
to do API pagination by setting a `Link` header to the URI where the next page
of results can be fetched from.

Also, an interesting idea about separating the basic application server (Flask)
from the async / websocket / permanent connection server (tornado, Go,
nodejs...) and connecting both via a Redis broker.

JSON API response validation: `voluptuous`

Building a JupyterLab
extension: <https://github.com/jupyterlab/extension-builder>, including a link
to a youtube tutorial.

Extending the JupyterLab notebook plugin: <https://jupyterlab-tutorial.readthedocs.io/en/latest/notebook.html#how-to-extend-the-notebook-plugin>

Rust microframework: <https://github.com/fengsp/pencil>