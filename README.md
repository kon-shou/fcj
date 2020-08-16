# fcj

## Description
Reads the json or text stored in the clipboard and displays the formatted result in the terminal.

## Feature
###  If "json" stored in the clipboard

- Display formatted json in the terminal.
- Formatted json is stored `~/.fcj/formatted.json`.

###  If "text" stored in the clipboard

- Decoded text is displayed in the terminal
- Decoded is stored `~/.fcj/formatted.text`.

## Install
`npm install -g fcj`

## How to Use?

1. copy the json output from the browser or console.
2. type "fcj".
3. Display a formatted and colored json in the terminal (decoded if it's UTF-8 encoded)
4. the result of the formatting will be saved in the file `~/.fcj/formatted.json`. (You can alias this file so that you can analyze the json in your familiar editor.
