import { blueBright, greenBright, magenta, cyan, white } from "chalk";

function calcIndent(level: number): string {
    return `${" ".repeat(2 * level)}`;
}

function renderPrimitiveValue(value, text: string, isLast = false): string {
    switch (typeof value) {
        case "string":
            text += `${greenBright(`"${value}"`)}`;
            break;
        case "number":
            text += `${cyan(value)}`;
            break;
        case "boolean":
            text += `${white(value)}`;
            break;
        case "object":
            if (value === null) {
                text += `${magenta(value)}`;
            } else {
                throw new Error(`Invalid Type Passed: ${value}`);
            }
            break;
        default:
            throw new Error(`Invalid Type Passed: ${value}`);
    }

    if (!isLast) text += ",";
    text += "\n";

    return text;
}

function renderArray(
    array: any[],
    text: string,
    indent: number,
    isLast = false
): string {
    text += "[\n";

    array.forEach((value, index) => {
        text += `${calcIndent(indent + 1)}`;
        text = render(value, text, indent + 1, index === array.length - 1);
    });

    text += `${calcIndent(indent)}]`;
    if (!isLast) text += ",";
    text += "\n";

    return text;
}

function renderObject(
    object: {},
    text: string,
    indent: number,
    isLast = false
): string {
    text += "{\n";

    Object.keys(object).forEach((key, index) => {
        text += `${calcIndent(indent + 1)}` + `${blueBright(`"${key}"`)}: `;
        text = render(
            object[key],
            text,
            indent + 1,
            index === Object.keys(object).length - 1
        );
    });

    text += `${calcIndent(indent)}}`;
    if (!isLast) text += ",";
    text += "\n";

    return text;
}

export function render(node, text = "", indent = 0, isLast = true): string {
    if (Array.isArray(node)) {
        return renderArray(node, text, indent, isLast);
    }
    if (typeof node === "object" && node !== null) {
        return renderObject(node, text, indent, isLast);
    }
    return renderPrimitiveValue(node, text, isLast);
}
