# PGP-generate (pgpg)

Simple CLI tool to generate PGP keys pair.

## Installation

`npm i -g pgp-generate`

## Usage

Run for details:
```shell
pgpg --help
```

Generate key to files {fileName}.private and {fileName}.public:
```shell
pgpg -n {name} -e {email} -p {secret phrase} -f {path to file}
```

Generate key to console:
```shell
pgpg -n {name} -e {email} -p {secret phrase} --print
```

Additional parameters:

`-l, --level`: key security level (0, 1, 2, 3), default is **3** (key with `4096` length will be generated)

## Contribution

Feel free to copy and use this version. Let me know if you need any further modifications!
