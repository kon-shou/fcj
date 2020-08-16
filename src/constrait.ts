export const JSON_COMMA = ",";
export const JSON_COLON = ":";
export const JSON_LEFTBRACKET = "[";
export const JSON_RIGHTBRACKET = "]";
export const JSON_LEFTBRACE = "{";
export const JSON_RIGHTBRACE = "}";
export const JSON_QUOTE = '"';

export const JSON_WHITESPACE = [" ", "\t", "\b", "\n", "\r"];
export const JSON_SYNTAX = [
    JSON_COMMA,
    JSON_COLON,
    JSON_LEFTBRACKET,
    JSON_RIGHTBRACKET,
    JSON_LEFTBRACE,
    JSON_RIGHTBRACE,
];

export const FALSE_LEN = "false".length;
export const TRUE_LEN = "true".length;
export const NULL_LEN = "null".length;

export const NUMBER_CHARS = [...Array(10).keys()]
    .map((int) => int.toString())
    .concat(["-", "e", "."]);
