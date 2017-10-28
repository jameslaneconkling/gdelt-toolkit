# `GDELT Toolkit`

```
Tools for downloading, parsing, and linting [GDELT](gdeltproject.org) data, with CLI and Module Bindings
```

---

# CLI API

```bash
npm install -g gdelt
```

```bash
gdelt <cmd> [args]

Commands:
  gdelt download  get gdelt by datetime
  gdelt lint      lint gdelt by datetime
  gdelt clean     clean cache

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

### Download

```bash
gdelt download

Options:
  --version       Show version number                                  [boolean]
  --help          Show help                                            [boolean]
  --datetime, -d  datetime                             [default: 20150218230000]
  --format, -f    output format        [choices: "json", "n3"] [default: "json"]
```

### Lint

```bash
gdelt lint

Options:
  --version       Show version number                                  [boolean]
  --help          Show help                                            [boolean]
  --datetime, -d  datetime                             [default: 20150218230000]
```

### Clean Cache

```
clean

clean cache

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```
