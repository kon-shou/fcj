import { readFileSync } from "fs";
import { parse } from "../parser";
import {
    normal,
    keyNotString,
    NotColonAfterKey,
    ObjParsedNextTokenIsNotRightbraceOrComma,
    ArrParsedNextTokenIsNotRightbraceOrComma,
} from "./tokens";

test("normal", () => {
    const data = readFileSync(`${__dirname}/json/normal.text`, "utf8");

    expect(parse(normal)[0]).toEqual(JSON.parse(data));
});

test("key Not String", () => {
    expect(() => parse(keyNotString)[0]).toThrowError(
        "Expected string key, got: [number] 1"
    );
});

test("Not Colon After Key", () => {
    expect(() => parse(NotColonAfterKey)[0]).toThrowError(
        "Expected colon after key in object, got: aaaa"
    );
});

test("Not Colon After Key In Obj", () => {
    expect(
        () => parse(ObjParsedNextTokenIsNotRightbraceOrComma)[0]
    ).toThrowError(
        "Expected right brace or colon after node in object, got: bbb"
    );
});

test("Not Colon After Key In Arr", () => {
    expect(
        () => parse(ArrParsedNextTokenIsNotRightbraceOrComma)[0]
    ).toThrowError(
        "Expected right bracket or comma after object in array, got: 2"
    );
});
