# GDELT TOOLKIT

Tools for downloading, parsing, and linting [GDELT](gdeltproject.org) data, with CLI and Module Bindings

---

### CLI API
```bash
npm install -g gdelt

gdelt <cmd> [args]

Commands:
  gdelt download  get gdelt by datetime
  gdelt lint      lint gdelt by datetime
  gdelt clean     clean cache
```

**Download**

```bash
gdelt download

Options:
  --datetime, -d  datetime             [defaults to today]
  --format, -f    output format        [choices: "json", "n3"] [default: "json"]
```

**Lint**

```bash
gdelt lint

Options:
  --datetime, -d  datetime                             [default: 20150218230000]
```

**Clean Cache**

```
clean

clean cache

Options: [none]
```
