
import { GoogleSheets } from "../src/GoogleSheets";

describe("google sheets", () => {

    const SHEET = new GoogleSheets("");

    it ("Test the hello world method", () => {
        expect(SHEET.getHelloWorld()).toEqual("Hello World");
    });
});