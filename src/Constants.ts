import { config } from 'dotenv';
import path from 'path';

config({
  path: path.resolve(__dirname, '..', '..', '.env'),
});

const { CREDENTIALS_FILE } = process.env;
const { TOKEN_FILE } = process.env;
const { SAMPLE_SHEET_ID } = process.env;

let CREDENTIALS_PATH = '';
let TOKEN_PATH = '';

if (CREDENTIALS_FILE !== undefined && TOKEN_FILE !== undefined) {
  CREDENTIALS_PATH = path.resolve(__dirname, '..', '..', CREDENTIALS_FILE);
  TOKEN_PATH = path.resolve(__dirname, '..', '..', TOKEN_FILE);
} else {
  CREDENTIALS_PATH = undefined;
  TOKEN_PATH = undefined;
}

export {
  CREDENTIALS_PATH,
  TOKEN_PATH,
  SAMPLE_SHEET_ID,
};
