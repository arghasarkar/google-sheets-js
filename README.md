# Google Sheets JS
An easy to use synchronous google sheets reader without the use of callbacks.

# Installation

`npm install --save google-sheets-js`

# Usage

This package can be used for reading data of excel spreadsheets.

## Reading Data

```typescript
const googleSheet = new GoogleSheets(SAMPLE_SPREADSHEET_ID);
const data = await googleSheet.fetchData("Sheet1!A1:C4");
```

The data will be read as:

```json
[
  [
    "colA",
    "colB",
    "colC"
  ],
  [
    "row2ColA",
    "row2ColB",
    "row2ColC"
  ],
  [
    "row3ColA",
    "row3ColB",
    "row3ColC"
  ],
  [
    "row4ColA",
    "row4ColB",
    "row4ColC"
  ]
]
```

## Refresh tokens
Each access token has an expiry date & time. After this, the token will need to be refreshed periodically. For 
refreshing the token,  

# Enable Google APIs and getting credentials

## 1. Enable Google Sheets API

1. Visit [Google Developers quickstart guide](https://developers.google.com/sheets/api/quickstart/nodejs?authuser).
2. Follow the instructions to enable Google API with your Google account.
3. Download the credentials and save them in `credentials-sample.json`.

## 2. Generate new token

The token is stored in the root directory in the file `token-sample.json`. To generate a new token, `ts-node` must be 
installed.

1. Execute the **TokenGenerator** by executing `ts-node src/TokenGenerator.ts`
2. Visit the URL which will open up a Google authentication interface. 
3. Login to the Google account or select the Google account from the list.
4. Allow permission to proceed. 
5. Copy the token shown on the screen. Paste it in the terminal and hit Enter.
6. A new file should be created called `token-sample.json`. 

This temporary token has an expiry date. If the token has expired, generate a new token in this way.

## 3. Get the Sheet ID of the spreadsheet to read
The sheet ID will need to be set in the `.env` file for `SAMPLE_SHEET_ID` variable.

1. Open the sheet from a web browser.
2. Select the Sheet ID from the URL. 
`https://docs.google.com/spreadsheets/d/{{SHEET_ID}}/edit#gid=0000000000`
3. Save the sheet id in the `.env` file. 
`SAMPLE_SHEET_ID=12312398ISADJAKSLHDASJHDASJDHAJSDHJASDASD`

# Setup 

Setting up the required Credentials & Tokens to GoogleSheets via this package can happen in two different ways. In the 
Firstly, the credentials and tokens can be provided in JSON files for which the location is set via `.env` file or 
environment variables. Secondly, the credentials and the token can be passed directly into the constructor as the second 
and third parameters.

## Setup via .env file

1) Create a `.env` file in the root directory of your project.
2) Set the relative location of your credentials file related to the root directory of your project.
`CREDENTIALS_FILE="credentials-sample.json"`
3) Set the relative location of your token file related to the root directory of your project.
`TOKEN_FILE="token-sample.json"`

**Sample .env file**
```.dotenv
CREDENTIALS_FILE="credentials-sample.json"
TOKEN_FILE="token-sample.json"

SAMPLE_SHEET_ID="1ENxACcSTa6QY0qg0qmmy1Yr808Nc6ar5RpCnmF5yUXM"
```
**Code**
The SheetID can be supplied via the `.env` file, or it can be passed via the first parameter in the constructor.
```typescript
const googleSheet = new GoogleSheets();
const data = await googleSheet.fetchData("Sheet1!A1:C4");
```

## Setup via passing credentials & token via the constructor

The credentials and token can be stored in two different variables in code. Just pass them as constructor parameters.

```typescript
const CREDENTIALS = "";
const TOKEN = "";

const googleSheet = new GoogleSheets(SAMPLE_SHEET_ID, CREDENTIALS, TOKEN);
const data = await googleSheet.fetchData("Sheet1!A1:C4");
```

