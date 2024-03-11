import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import * as openpgp from 'openpgp';


const keySizes = [1024, 2048, 4096, 8194];

// Generate PGP key pair and optionally print or save to files.
const generatePGPKeyPair = async (name, email, keySize, passphrase) => {
	return await openpgp.generateKey({
		type: 'rsa',
		rsaBits: keySize,
		userIDs: [{ name , email }],
		passphrase: passphrase,
	});
}

// Print keys to console.
const printKeys = ({ privateKey, publicKey }) => {
	console.log('Private Key:', privateKey);
	console.log('Public Key:', publicKey);
}

// Write keys to .private and .public files.
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

const main = async () => {

	// Process command line arguments
	const args = process.argv.slice(2);
	const nameIndex = args.indexOf('--name');
	const emailIndex = args.indexOf('--email');
	const levelIndex = args.indexOf('--level');
	const passphraseIndex = args.indexOf('--passphrase');

	const fileNameIndex = args.indexOf('--fileName');
	const printFlagIndex = args.indexOf('--print');

	if (nameIndex === -1 || emailIndex === -1 || passphraseIndex === -1 || (fileNameIndex === -1 && printFlagIndex === -1)) {
		console.error('Invalid parameters.');
		return;
	}

	// Extract fileName and print flag from command line arguments
	const name = args[nameIndex + 1];
	const email = args[emailIndex + 1];
	const passphrase = args[passphraseIndex + 1];

	const levelParam = process.argv[levelIndex + 1];
	let keySize;
	if (levelParam !== undefined) {
		const level = parseInt(levelParam, 10);

		if (!isNaN(level) && level >= 0 && level < keySizes.length) {
			keySize = keySizes[level];
		} else {
			keySize = 4096;
		}
	} else {
		keySize = 4096;
	}

	const fileName = args[fileNameIndex + 1];
	const print = printFlagIndex !== -1;

	// Generate and handle PGP key pair
	const keys = await generatePGPKeyPair(name, email, keySize, passphrase);
	if (print) {
		printKeys(keys);
	}
	else {
		await saveKeysToFile(keys, fileName);
	}
}

main().catch(error => {
	console.error('Error generating PGP key pair:', error);
})
