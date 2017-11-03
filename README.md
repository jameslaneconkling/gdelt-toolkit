# GDELT TOOLKIT

Tools for downloading, parsing, and linting [GDELT](//www.gdeltproject.org) data, with CLI and Module Bindings

---

### CLI API
```bash
npm install -g gdelt-toolkit

gdelt <cmd> [args]

Commands:
  gdelt download  get gdelt by datetime
  gdelt lint      lint gdelt by datetime
  gdelt clean     clean cache
```


**Download**

Download GDELT file and ouput as `JSON` or `N3` for specified UTC datetime (ISO-8601).  GDELT files are published on the hour at 15min intervals; omitting the datetime arg will download the first file of the day.  Downloads are cached locally.

Default rules for parsing GDELT tsv files are defined for [JSON](https://github.com/jameslaneconkling/gdelt-toolkit/blob/master/config/jsonTransform.js) and [N3](https://github.com/jameslaneconkling/gdelt-toolkit/blob/master/config/tripleTransform.js).

```bash
gdelt download [-d YYYY-MM-DD | YYYY-MM-DDThh:mm] [-f] [--cachePath]

Options:
  --datetime, -d  datetime          [defaults to today]
  --format,   -f  output format     [choices: "json", "n3"] [default: "json"]
  --cachePath     path to cache     [defaults to internal module cache]
```


**Lint**

Lint GDELT file for specified UTC datetime (ISO-8601), outputting linting errors as `JSON`.  Omitting the datetime arg will download the first file of the day.

Default linting rules are defined [here](https://github.com/jameslaneconkling/gdelt-toolkit/blob/master/config/linters.js).

```bash
gdelt download [-d YYYY-MM-DD | YYYY-MM-DDThh:mm] [--cachePath]

Options:
  --datetime, -d  datetime          [default to today]
  --cachePath     path to cache     [defaults to internal module cache]
```


**List**

List all available GDELT files, outputting a `JSON` list of each file url, size, and checksum.

```bash
gdelt list [--cachePath]

Options:
  --cachePath     path to cache     [defaults to internal module cache]
```


**Clean Cache**

Clear cache of downloaded GDELT files.


```bash
gdelt clean

clean cache [--cachePath]

Options:
  --cachePath     path to cache     [defaults to internal module cache]
```
