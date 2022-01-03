# html-ellipsis

[![NPM](https://img.shields.io/npm/l/html-ellipsis)](https://github.com/alexghr/html-ellipsis/blob/main/LICENSE)
[![Test](https://github.com/alexghr/html-ellipsis/actions/workflows/test.yml/badge.svg)](https://github.com/alexghr/html-ellipsis/actions/workflows/test.yml)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![npm](https://img.shields.io/npm/v/html-ellipsis)](https://www.npmjs.com/package/html-ellipsis)
[![npm](https://img.shields.io/npm/dm/html-ellipsis)](https://npmcharts.com/compare/html-ellipsis?interval=30&log=false)

Truncates a html string without messing up HTML tags

```sh
npm install --save html-ellipsis
```

## Example

```js
var ellipsis = require('html-ellipsis');
var text = 'Lorem <span class="ipsum"><b>ips<i>um</i></b></span>';
console.log(ellipsis(text, 11, true)); // Lorem <span class="ipsum"><b>ips<i>u</i></b></span>&hellip;
```

## License
See [LICENSE](./LICENSE)
