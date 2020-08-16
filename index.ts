#!/usr/bin/env node

import { writeFileSync, existsSync, mkdirSync } from "fs";
import { homedir } from "os";
import { greenBright, bold } from "chalk";
import stripAnsi from "strip-ansi";
import { readSync } from "clipboardy";
import { lex } from "./src/lexer";
import { parse } from "./src/parser";
import { render } from "./src/renderer";

export function main() {
    const clipboard = readSync().trim();
    const trimmedClipboard = trimQuote(clipboard);

    try {
        const tokens = lex(trimmedClipboard);
        const jsonObject = parse(tokens)[0];
        let formatted = render(jsonObject);
        formatted = decodeString(formatted);
        console.log(bold(formatted));
        return saveFile(stripAnsi(formatted), true);
    } catch (e) {
        const formatted = decodeString(clipboard);
        console.log(greenBright.bold(formatted));
        return saveFile(formatted);
    }
}

function decodeString(text: string) {
    return unescape(text.replace(/\\u/g, "%u"));
}

export function saveFile(text: string, isJson = false): void {
    const cacheDir = `${homedir()}/.fcj`;

    if (!existsSync(cacheDir)) {
        mkdirSync(cacheDir);
    }

    writeFileSync(`${cacheDir}/formatted${isJson ? ".json" : ".text"}`, text);
}

function trimQuote(text: string) {
    if (
        (text.startsWith("'") && text.endsWith("'")) ||
        (text.startsWith('"') && text.endsWith('"'))
    ) {
        const trimmed = text.slice(1, -1);
        return trimQuote(trimmed);
    }
    return text;
}

main();
