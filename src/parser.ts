import {
    JSON_COLON,
    JSON_COMMA,
    JSON_LEFTBRACE,
    JSON_LEFTBRACKET,
    JSON_RIGHTBRACE,
    JSON_RIGHTBRACKET,
} from "./constrait";

function parseObject(tokens: tokenArray): [{}, tokenArray] {
    const jsonObject = {};
    if (tokens[0] === JSON_RIGHTBRACE) return [jsonObject, tokens.slice(1)];

    while (true) {
        const jsonKey = tokens.shift();
        if (typeof jsonKey !== "string") {
            throw new Error(
                `Expected string key, got: [${typeof jsonKey}] ${jsonKey}`
            );
        }

        const colon = tokens.shift();
        if (colon !== JSON_COLON) {
            throw new Error(
                `Expected colon after key in object, got: ${jsonKey}`
            );
        }

        const [value, rest] = parse(tokens);
        tokens = rest;
        jsonObject[jsonKey] = value;

        const rightBraceOrComma = tokens.shift();
        switch (rightBraceOrComma) {
            case JSON_COMMA:
                // do next loop
                break;
            case JSON_RIGHTBRACE:
                return [jsonObject, tokens];
            default:
                throw new Error(
                    `Expected right brace or colon after node in object, got: ${rightBraceOrComma}`
                );
        }
    }
}

function parseArray(tokens: tokenArray): [any[], tokenArray] {
    const jsonArray = [];
    if (tokens[0] === JSON_RIGHTBRACKET) return [jsonArray, tokens.slice(1)];

    while (true) {
        let [value, rest] = parse(tokens);
        tokens = rest;
        jsonArray.push(value);

        const rightBracketOrComma = tokens.shift();
        switch (rightBracketOrComma) {
            case JSON_COMMA:
                // do next loop
                break;
            case JSON_RIGHTBRACKET:
                return [jsonArray, tokens];
            default:
                throw new Error(
                    `Expected right bracket or comma after object in array, got: ${rightBracketOrComma}`
                );
        }
    }
}

export function parse(tokens: tokenArray): [any, tokenArray] {
    if (tokens[0] === JSON_LEFTBRACE) return parseObject(tokens.slice(1));
    if (tokens[0] === JSON_LEFTBRACKET) return parseArray(tokens.slice(1));
    return [tokens[0], tokens.slice(1)];
}

type tokenArray = (string | number | boolean | null)[];
