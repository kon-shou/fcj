import {
    FALSE_LEN,
    JSON_QUOTE,
    JSON_SYNTAX,
    JSON_WHITESPACE,
    NULL_LEN,
    NUMBER_CHARS,
    TRUE_LEN,
} from "./constrait";

function lexString(text: string): [string, string] {
    let jsonString = "";

    text = text.slice(1); // remove first double quote
    for (const char of text) {
        if (char === JSON_QUOTE) {
            return [
                jsonString,
                text.slice(jsonString.length + 1), // remove last double quote
            ];
        }
        jsonString += char;
    }
}

function lexNumber(text: string): [number, string] {
    let jsonNumber = "";

    for (const char of text) {
        if (!NUMBER_CHARS.includes(char)) break;
        jsonNumber += char;
    }

    return [
        jsonNumber.includes(".")
            ? parseFloat(jsonNumber)
            : parseInt(jsonNumber, 10),
        text.slice(jsonNumber.length),
    ];
}

function lexBool(text: string): [boolean, string] {
    return text.slice(0, TRUE_LEN) === "true"
        ? [true, text.slice(TRUE_LEN)]
        : [false, text.slice(FALSE_LEN)];
}

function lexNull(text: string): [null, string] {
    return [null, text.slice(NULL_LEN)];
}

function lexWhiteSpace(text: string): [undefined, string] {
    return [undefined, text.slice(1)];
}

function lexJsonSyntax(text: string): [string, string] {
    return [text[0], text.slice(1)];
}

function determineTextType(text: string) {
    if (text[0] === JSON_QUOTE) return lexString;
    if (NUMBER_CHARS.includes(text[0])) return lexNumber;
    if (
        (text.length >= TRUE_LEN && text.slice(0, TRUE_LEN) === "true") ||
        (text.length >= FALSE_LEN && text.slice(0, FALSE_LEN) === "false")
    ) {
        return lexBool;
    }
    if (text.length >= NULL_LEN && text.slice(0, NULL_LEN) === "null") {
        return lexNull;
    }
    if (JSON_WHITESPACE.includes(text[0])) return lexWhiteSpace;
    if (JSON_SYNTAX.includes(text[0])) return lexJsonSyntax;

    throw new Error(`Text contains not supported char: ${text[0]}`);
}

export function lex(text: string): (string | number | boolean | null)[] {
    const tokens = [];

    while (text.length > 0) {
        const lexFunc = determineTextType(text);
        let [token, rest] = lexFunc(text);
        if (token !== undefined) {
            tokens.push(token);
        }
        text = rest;
    }

    return tokens;
}
