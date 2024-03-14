#!/usr/bin/env node

import { Command } from 'commander';
import * as openpgp from 'openpgp';

import { promises as fs } from 'fs';
import { dirname, join } from 'path';

const keySizes = [1024, 2048, 4096, 8194];

// Function to generate PGP key pair
const generatePGPKeyPair = async (name, email, keySize, passphrase) => {
	return await openpgp.generateKey({
		type: 'rsa',
		rsaBits: keySize,
		userIDs: [{ name , email }],
		passphrase: passphrase,
	});
}

// Function to print keys to console
const printKeys = ({ privateKey, publicKey }) => {
	console.log('Private Key:', privateKey);
	console.log('Public Key:', publicKey);
}

// Function to save keys to files
const saveKeysToFile = async ({ privateKey, publicKey }, fileName) => {
	// Set file paths for private and public keys
	const privateKeyPath = join(__dirname, fileName + '.private');
	const publicKeyPath = join(__dirname, fileName + '.public');

	// Ensure that the directories in the path exist
	await fs.mkdir(dirname(privateKeyPath), { recursive: true });

	// Write private and public keys to files
	await fs.writeFile(privateKeyPath, privateKey);
	await fs.writeFile(publicKeyPath, publicKey);

	console.log(`Key pair files generated: ${privateKeyPath} and ${publicKeyPath}`);
}

// Create a new Commander program
const program = new Command();

// Define CLI options and commands
program
	.requiredOption('-n, --name <name>', 'Your name')
	.requiredOption('-e, --email <email>', 'Your email')
	.requiredOption('-p, --passphrase <passphrase>', 'Passphrase for the key pair')
	.option('-l, --level <level>', '(Optional) Key size level (1, 2, 3, 4)', '3')
	.option('-f, --fileName [fileName]', '(Optional) File name for saving the key pair')
	.option('--print', '(Optional) Print the key pair to the console')
	.action(async () => {
		// Process command line options
		const options = program.opts();

		const { name, email, level, passphrase, fileName, print } = options;

		// Convert level to key size
		const keySize = keySizes[parseInt(level, 10) + 1] || 4096;

		// Generate and handle PGP key pair
		const keys = await generatePGPKeyPair(name, email, keySize, passphrase);
		if (!print && fileName) {
			await saveKeysToFile(keys, fileName);
		} else {
			printKeys(keys);
		}
	});

// Parse command line arguments
program.parse(process.argv);
