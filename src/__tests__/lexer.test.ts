import { readFileSync } from "fs";
import { lex } from "../lexer";
import { normal } from "./tokens";

test("normal", () => {
    const data = readFileSync(`${__dirname}/json/normal.text`, "utf8");

    expect(lex(data)).toEqual(normal);
});

test("invalid json", () => {
    const data = readFileSync(`${__dirname}/json/invalid.text`, "utf8");

    expect(() => lex(data)).toThrowError("Text contains not supported char: '");
});
