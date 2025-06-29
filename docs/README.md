## Dependencies:

```
pip install -r requirements.txt
```
## Build

```
$ mkdir build
$ sphinx-build -M html source build -a
```

Alternatively, ``make html``.

## Patch

```
./patch-1.sh
```

## Publish
Export contents of `build/html` to host.
