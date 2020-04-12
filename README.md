# html-ellipsis

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
