import * as fs from 'fs';

import { google, Auth } from 'googleapis';

import readline from 'readline';

import {
  CREDENTIALS_PATH,
  TOKEN_PATH,
  SAMPLE_SHEET_ID,
} from './Constants';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export = class GoogleSheets {
    spreadsheetId: string;

    credentialsPath: string;

    tokenPath: string;

    credentials: any = undefined;

    token: any = undefined;

    clientSecret: string;

    clientId: string;

    redirectUris: string;

    oAuth2Client: Auth.OAuth2Client;

    constructor(spreadsheetId: string, credentials: string, token: string) {
      if (credentials !== undefined && token !== undefined) {
        // Tokens parsed in directly
        try {
          this.credentials = JSON.parse(credentials);
          this.token = JSON.parse(token);
          this.authorize();
        } catch (tokenParseError) {
          throw new Error('Unable to parse credentials and access tokens.');
        }
      } else {
        // Read from .env file
        if (CREDENTIALS_PATH === undefined || TOKEN_PATH === undefined) {
          throw new Error('Trying to read credentials from .env file. The Credentials and Token file paths are not set correctly..');
        }
        this.credentialsPath = CREDENTIALS_PATH;
        this.tokenPath = TOKEN_PATH;
        this.loadCredentials();
      }

      if (spreadsheetId !== undefined) {
        this.spreadsheetId = spreadsheetId;
      } else if (SAMPLE_SHEET_ID !== undefined) {
        this.spreadsheetId = SAMPLE_SHEET_ID;
      } else {
        throw new Error('Spreadsheet ID is not set. Set it via the constructor or via the .env file.');
      }
    }

    loadCredentials(): void {
      this.credentials = JSON.parse(String(fs.readFileSync(this.credentialsPath)));

      this.token = fs.existsSync(this.tokenPath)
        ? JSON.parse(String(fs.readFileSync(this.tokenPath)))
        : undefined;

      this.authorize();
    }

    authorize(): void {
      this.clientId = this.credentials.installed.client_id;
      this.clientSecret = this.credentials.installed.client_secret;
      this.redirectUris = this.credentials.installed.redirect_uris;

      this.oAuth2Client = new google.auth.OAuth2(
        this.clientId,
        this.clientSecret,
        this.redirectUris[0],
      );

      if (this.token === undefined) {
        this.getNewToken();
      }

      this.oAuth2Client.setCredentials(this.token);
    }

    getNewToken(): void {
      const authUrl = this.oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question('Enter the token below: ', (code: string) => {
        this.oAuth2Client.getToken(code, (err, token) => {
          if (err) {
            throw new Error('Error while trying to retrieve access token.');
          }
          this.oAuth2Client.setCredentials(token);
          fs.writeFileSync(this.tokenPath, JSON.stringify(token));
        });

        rl.close();
      });
    }

    async fetchData(range: string) : Promise<any> {
      const auth = this.oAuth2Client;
      const sheets = google.sheets({ version: 'v4', auth });

      const data = await (sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      }));

      return data.data.values;
    }
}
