import { SAMPLE_SHEET_ID } from './Constants';

import GoogleSheets from './index';

// @ts-ignore
const gs = new GoogleSheets(SAMPLE_SHEET_ID, undefined, undefined);
gs.fetchData('Sheet1!A1:C4')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
