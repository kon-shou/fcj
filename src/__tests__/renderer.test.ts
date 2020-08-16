import { readFileSync } from "fs";
import { render } from "../renderer";
import { blueBright, greenBright, magenta, cyan, white } from "chalk";

test("normal", () => {
    const data = readFileSync(`${__dirname}/json/normal.text`, "utf8");
    const result = `{
  ${blueBright('"key1"')}: {
    ${blueBright('"key2"')}: ${greenBright('"aaa"')}
  },
  ${blueBright('"key3"')}: [
    {
      ${blueBright('"key4"')}: {
        ${blueBright('"key5"')}: ${cyan("-1")},
        ${blueBright('"key6"')}: ${cyan("0.1")},
        ${blueBright('"key7"')}: ${greenBright('"10e"')},
        ${blueBright('"key8"')}: ${greenBright('"-10"')}
      }
    },
    {
      ${blueBright('"key9"')}: [
        ${magenta("null")},
        ${greenBright('"ccc"')},
        {
          ${blueBright('"key10"')}: ${white("true")},
          ${blueBright('"key11"')}: ${white("false")},
          ${blueBright('"key12"')}: {
            ${blueBright('"key13"')}: ${magenta("null")}
          }
        }
      ]
    }
  ]
}
`;
    expect(render(JSON.parse(data))).toEqual(result);
});
