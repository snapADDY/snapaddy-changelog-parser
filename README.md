# snapADDY Changelog Parser

A Github Action to parse manually created changelogs for automatic Github Releases.

This action reads a markdown changelog file, and provides the latest versions release notes to steps further down the pipeline.

### Simple example:
```yaml
on:
  push:
    tags:
      - "[0-9]+.[0-9]+.[0-9]+"

jobs:
  tagged-release:
    name: "Tagged Release"
    runs-on: "ubuntu-latest"

    steps:
      - name: Read Changelog
        uses: snapADDY/snapaddy-parse-changelog@1.0.0
        id: read
      - name: Release
        uses: softprops/action-gh-release@v1
        with:
          body: ${{ steps.read.outputs.changelog }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## Required changelog formatting:
Each section hast to start with a `#` followed by a space (markdown H1) and a semver formatted version number. Brackets around the version number are also supported, in case it's a hyperlink.
```markdown
# 1.0.0
or
# [1.0.0](https://)
```

### Example:
This input:
```markdown
# [1.0.0](https://github.com/...) (2021-04-30)
## Features
- CI Magic 🧙‍♂️

# [0.1.0](https://github.com/...) (2021-04-27)
## Fixes
- more notes
```
would return:
```markdown
## Features
- CI Magic 🧙‍♂️
```

---

### Input
| Name | Type | Description | Default |
|---|---|---|---|
| changelog-path | string | Path to the changelog file | `CHANGELOG.md` |

### Output
| Name | Type | Description |
|---|---|---|
| changelog | string |  |