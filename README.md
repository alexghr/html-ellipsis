# html-ellipsis &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[![html-ellipsis API Documentation](https://www.omniref.com/js/npm/html-ellipsis.png)](https://www.omniref.com/js/npm/html-ellipsis)&nbsp;&nbsp;[![Build Status](https://travis-ci.org/alexghr/html-ellipsis.svg)](https://travis-ci.org/alexghr/html-ellipsis)

Truncates a html string without messing up HTML tags

## Example
``` js
var ellipsis = require('html-ellipsis');
var text = 'Lorem <span class="ipsum"><b>ips<i>um</i></b></span>';
console.log(ellipsis(text, 11, true)); // Lorem <span class="ipsum"><b>ips<i>u</i></b></span>&hellip;
```

## Install
UMD is supported so you can use whatever you want to load the script. 

### Node/Browserify
Install it first
``` sh
npm install --save html-ellipsis
```

Then use it like so
``` js
var ellipsis = require('html-ellipsis');
ellipsis(someHtml);
```

### AMD
Place it next to your other scripts and require `html-ellipsis` as a dependancy.
``` js
require(['html-ellipsis'], function(ellipsis) {
	ellipsis(someHtml);
});
```

### Global variable
Just drop the script inside your HTML page and use the global `htmlEllipsis` function, but you should really consider using a module loader.
``` html
<script src="html-ellipsis.js"></script>
<script>
	htmlEllipsis(someHtml);
</script>
```

## License
Licensed under the MIT license.
