#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var openpgp = require("openpgp");
var fs_1 = require("fs");
var path_1 = require("path");
var KEY_SIZES = [1024, 2048, 4096, 8194];
// Function to generate PGP key pair
var generatePGPKeyPair = function (name, email, keySize, passphrase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openpgp.generateKey({
                    type: 'rsa',
                    rsaBits: keySize,
                    userIDs: [{ name: name, email: email }],
                    passphrase: passphrase,
                })
                // Function to print keys to console
            ];
            case 1: return [2 /*return*/, _a.sent()
                // Function to print keys to console
            ];
        }
    });
}); };
// Function to print keys to console
var printKeys = function (_a) {
    var privateKey = _a.privateKey, publicKey = _a.publicKey;
    console.log('Private Key:', privateKey);
    console.log('Public Key:', publicKey);
};
// Function to save keys to files
var saveKeysToFile = function (_a, fileName_1) { return __awaiter(void 0, [_a, fileName_1], void 0, function (_b, fileName) {
    var privateKeyPath, publicKeyPath;
    var privateKey = _b.privateKey, publicKey = _b.publicKey;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                privateKeyPath = (0, path_1.join)(process.cwd(), fileName + '.private');
                publicKeyPath = (0, path_1.join)(process.cwd(), fileName + '.public');
                // Ensure that the directories in the path exist
                return [4 /*yield*/, fs_1.promises.mkdir((0, path_1.dirname)(privateKeyPath), { recursive: true })];
            case 1:
                // Ensure that the directories in the path exist
                _c.sent();
                // Write private and public keys to files
                return [4 /*yield*/, fs_1.promises.writeFile(privateKeyPath, privateKey)];
            case 2:
                // Write private and public keys to files
                _c.sent();
                return [4 /*yield*/, fs_1.promises.writeFile(publicKeyPath, publicKey)];
            case 3:
                _c.sent();
                console.log("Key pair files generated: ".concat(privateKeyPath, " and ").concat(publicKeyPath));
                return [2 /*return*/];
        }
    });
}); };
// Create a new Commander program
var program = new commander_1.Command();
program
    .name('PGP-generate (pgpg)')
    .description('Simple CLI tool to generate PGP keys pair');
program
    .requiredOption('-n, --name <name>', 'Your name')
    .requiredOption('-e, --email <email>', 'Your email')
    .requiredOption('-p, --passphrase <passphrase>', 'Passphrase for the key pair')
    .option('-l, --level <level>', '(Optional) Key size level (1, 2, 3, 4)', '3')
    .option('-f, --fileName [fileName]', '(Optional) File name for saving the key pair')
    .option('--print', '(Optional) Print the key pair to the console')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var options, name, email, level, passphrase, fileName, print, keySize, keys;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = program.opts();
                name = options.name, email = options.email, level = options.level, passphrase = options.passphrase, fileName = options.fileName, print = options.print;
                keySize = KEY_SIZES[parseInt(level, 10) + 1] || 4096;
                return [4 /*yield*/, generatePGPKeyPair(name, email, keySize, passphrase)];
            case 1:
                keys = _a.sent();
                if (!(!print && fileName)) return [3 /*break*/, 3];
                return [4 /*yield*/, saveKeysToFile(keys, fileName)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                printKeys(keys);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
// Parse command line arguments
program.parse(process.argv);
