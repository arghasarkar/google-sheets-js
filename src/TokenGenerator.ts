import { CREDENTIALS_PATH, TOKEN_PATH, SAMPLE_SHEET_ID } from './Constants';
import * as GoogleSheets from './index';

// @ts-ignore
const gs = new GoogleSheets(SAMPLE_SHEET_ID, CREDENTIALS_PATH, TOKEN_PATH);
gs.getNewToken();
