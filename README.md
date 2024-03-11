# PGP-simple (pgps)

CLI tool to generate PGP keys pair

## Usage

Run for details:
```shell
pgps --help
```

Generate key to files {fileName}.private and {fileName}.public:
```shell
pgps -n {name} -e {email} -p {secret phrase} -f {path to file}
```

Generate key to console:
```shell
pgps -n {name} -e {email} -p {secret phrase} -f {path to file} --print
```

Additional parameters:

`-l, --level`: key security level (0, 1, 2, 3), default is **3** (key with `4096` length will be generated)

## Contribution

Feel free to copy and use this version. Let me know if you need any further modifications!
