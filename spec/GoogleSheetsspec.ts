import * as fs from 'fs';
import path from 'path';

import "../src/GoogleSheets";
import GoogleSheets from "../src/GoogleSheets";
import {
    CREDENTIALS_PATH,
    TOKEN_PATH,
    SAMPLE_SHEET_ID
} from "../src/Constants";

describe("Google sheets.", () => {

    const SAMPLE_SHEET_NAME = "Sheet1";
    const SAMPLE_CELL_RANGE = "A1:C4";

    describe("Credentials and Token passed in via constructor.", () => {
        const CREDENTIALS = fs.readFileSync("credentials-sample.json").toString();
        const TOKEN = fs.readFileSync("token-sample.json").toString();

        it("Credentials can be parsed.", () => {
            expect(CREDENTIALS).not.toEqual(undefined);
        })

        it("Token can be parsed.", () => {
            expect(TOKEN).not.toEqual(undefined);
        })

        const SHEET: GoogleSheets = new GoogleSheets(SAMPLE_SHEET_ID, CREDENTIALS, TOKEN);

        it ("Class can initialize", () => {
            expect(SHEET).not.toBeNaN();
        });

        it ("Spreadsheet ID has been set correctly.", () => {
            expect(SHEET.spreadsheetId).toEqual(SAMPLE_SHEET_ID);
        })

        it ("Credentials is parsed correctly from the constructor", () => {
            expect(SHEET.credentials).not.toBeNaN();
            expect(SHEET.clientSecret).not.toBeNaN();
            expect(SHEET.clientId).not.toBeNaN();
            expect(SHEET.redirectUris).not.toBeNaN();
        });

        it ("Parse token correctly from constructor.", () => {
            expect(SHEET.token).not.toEqual(undefined);
        });

        it ("Can fetch sample data", async() => {
            let dataRange = `${SAMPLE_SHEET_NAME}!${SAMPLE_CELL_RANGE}`;

            const ACTUAL_DATA = await SHEET.fetchData(dataRange);

            expect(ACTUAL_DATA).not.toBeNaN();
        });

    });

    describe("Credentials and Token read for .env file", () => {
        const SHEET: GoogleSheets = new GoogleSheets(SAMPLE_SHEET_ID, undefined, undefined);

        const SAMPLE_SHEET_NAME = "Sheet1";
        const SAMPLE_CELL_RANGE = "A1:C4";

        it ("Class can initialize", () => {
            expect(SHEET).not.toBeNaN();
        });

        it ("Spreadsheet ID has been set correctly.", () => {
            expect(SHEET.spreadsheetId).toEqual(SAMPLE_SHEET_ID);
        })

        it ("Credentials file is parsed correctly.", () => {
            expect(SHEET.credentials).not.toBeNaN();
            expect(SHEET.clientSecret).not.toBeNaN();
            expect(SHEET.clientId).not.toBeNaN();
            expect(SHEET.redirectUris).not.toBeNaN();
        });

        it ("Read token file when it is present.", () => {
            expect(SHEET.token).not.toEqual(undefined);
        });

        it ("Can fetch sample data", async() => {
            let dataRange = `${SAMPLE_SHEET_NAME}!${SAMPLE_CELL_RANGE}`;

            const ACTUAL_DATA = await SHEET.fetchData(dataRange);

            expect(ACTUAL_DATA).not.toBeNaN();
        });
    });

});

