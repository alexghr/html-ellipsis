var ellip = function(html, max, opt_ellipsize) {
	var len = html.length;
	if (len < max) {
		return html; 
	}

	if (opt_ellipsize) {
		--max;
	}

	var i = 0, charCount = 0, tagStack = [];
	while (i < len - 1 && charCount < max) {
		if (html[i] === '<') {
			var tagClose = html.indexOf('>', i);
			if (html[i + 1] === '/') {
				tagStack.pop();
			} else {
				tagStack.push(html.slice(i + 1, tagClose));
			}

			i = tagClose + 1;
		} else {
			charCount++;
			++i;
		}
	}

	var result = html.slice(0, i);

	for (var j = tagStack.length - 1; j >= 0; --j) {
		var tag = tagStack[j];
		var end =  tag.indexOf(' ');
		end = end === -1 ? tag.length : end;
		result += '</' + tag.slice(0, end) + '>';
	}

	if (opt_ellipsize) {
		result += '&hellip;';
	}

	return result;
};

var str = '<span><b>Lorem ipsum dolor sit amet</b>, consectetur <span class="gigi">adipiscing <i>elit</i></span>. Integer gravida tortor eget gravida vestibulum. Mauris quis laoreet dolor. Ut a augue non tortor accumsan malesuada eget vitae mi. Nam posuere.</span>';

var n = 51;
var short = ellip(str, n, true);
console.log(str.slice(0, n));
console.log(short, 'length ' + short.length);

