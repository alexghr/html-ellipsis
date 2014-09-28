# html-truncate

Truncates a html string without messing up HTML tags

## Example
``` js
var truncate = require('html-truncate');
var text = 'Lorem <span class="ipsum"><b>ips<i>um</i></b></span>';
console.log(truncate(text), 11, true); // Lorem <span class="ipsum"><b>ips<i>u</i></b></span>&hellip;
```

## Install
UMD is supported so you can use whatever you want to load the script. 

### Node/Browserify
Install it first
``` sh
npm install --save html-truncate
```

Then use it like so
``` js
var truncate = require('html-truncate');
truncate(someHtml);
```

### AMD
Place it next to your other scripts and require `html-truncate` as a dependancy.
``` js
require(['html-truncate'], function(truncate) {
	truncate(someHtml);
});
```

### Global variable
Just drop the script inside your HTML page and use the global `htmlTruncate` function, but you should really consider using a module loader.
``` html
<script src="html-truncate.js"></script>
<script>
	htmlTruncate(someHtml);
</script>
```

## License
Licensed under the MIT license.
