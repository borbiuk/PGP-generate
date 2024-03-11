import { promises as fs } from 'fs';
import { generateKeyPair } from 'crypto';
import { promisify } from 'util';
import { join, dirname } from 'path';

// Generate PGP key pair and optionally print or save to files.
const generatePGPKeyPair = () => {
	return promisify(generateKeyPair)('rsa', {
		modulusLength: 2048,
		publicKeyEncoding: { type: 'spki', format: 'pem' },
		privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
	});
}

// Print keys to console.
const printKeys = ({ privateKey, publicKey }) => {
	console.log('Private Key:', privateKey);
	console.log('Public Key:', publicKey);
}

// Write keys to .private and .public files.
const saveKeysToFile = async ({ privateKey, publicKey }, fileName: string): Promise<void> => {
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

const main = async (): Promise<void> => {

	// Process command line arguments
	const args = process.argv.slice(2);
	const fileNameIndex = args.indexOf('--fileName');
	const printFlagIndex = args.indexOf('--print');

	if (fileNameIndex === -1) {
		console.error('Please provide a fileName parameter using --fileName.');
		return;
	}

	// Extract fileName and print flag from command line arguments
	const fileName: string = args[fileNameIndex + 1];
	const print: boolean = printFlagIndex !== -1;

	// Generate and handle PGP key pair
	const keys = await generatePGPKeyPair();
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
