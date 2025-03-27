# PGP-generate (pgpg)

A simple CLI tool for generating PGP key pairs.

## Installation

Install globally using npm:

```sh
npm install -g pgp-generate
```

## Usage

### Display Help

To see all available commands and options, run:

```sh
pgpg --help
```

### Generate a PGP Key Pair to Files

Generate a PGP key pair and save it as `{fileName}.private` and `{fileName}.public`:

```sh
pgpg -n <name> -e <email> -p <secret phrase> -f <path to file>
```

### Generate a PGP Key Pair to Console

Generate a PGP key pair and print it directly to the console:

```sh
pgpg -n <name> -e <email> -p <secret phrase> --print
```

### Additional Options

- `-l, --level`: Sets the key security level (0, 1, 2, 3).
    - Default: **3** (generates a `4096-bit` key for maximum security).

## Contributing

Contributions are welcome! Feel free to fork, modify, and submit a pull request.

For issues or feature requests, please open an issue.

---

This version makes the content clearer, improves readability, and adds professionalism. Let me know if you'd like any
tweaks! 🚀
