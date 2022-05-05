<img
  src="https://raw.githubusercontent.com/hypermario/vscode-TUMOheader/master/TUMO.png" 
  width=128>

# TUMO Header for VSCode

This extension provides the TUMO header integration in VS Code.

```js
/* ************************************************************************** */
/*                                                                            */
/*                                             ________     ______________    */
/*     main.js                                (__   ___)   (  _   _   ___ )   */
/*                                               | | | |   | | | | | |  | |   */
/*                                               | | | |___| | | | | |__| |   */
/*     By: jeremy.molvaut                        (_) (_______) (_) (______)   */
/*     Created: 00/00/00 00:00:00                                   Paris     */
/*                                                                            */
/* ************************************************************************** */
```

## Install

Launch Quick Open with <kbd>⌘</kbd>+<kbd>P</kbd> and enter
```
ext install TUMOheader
```

## Usage

### Insert a header
 - **macOS** : <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>H</kbd>
 - **Linux** / **Windows** : <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>H</kbd>.

Header is automatically updated on save.


## Configuration

Default values for **username** and **email** are imported from environment variables.

To override these values, specify these properties in *User Settings* :

```ts
{
  "TUMOheader.username": string,
  "TUMOheader.email": string
}
```


## Issues

In case of a bug, or missing feature, please create a [Github Pull Request](https://github.com/Hypermario/vscode-TUMOheader/pulls).

## License

MIT
