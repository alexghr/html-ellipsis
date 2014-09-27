// (c) 2014 Alex Gherghisan
// Licensed under the MIT license

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports !== 'undefined') {
		module.exports = factory();
	} else {
		root.htmlTruncate = factory();
	}
}(this, function factory() {

	return function(html, maxLength, opt_addEllipsis) {
		var len = html.length;
		if (len < maxLength) {
			return html; 
		}

		if (opt_addEllipsis) {
			--maxLength;
		}

		var i = 0;
		var charCount = 0;
		var tagStack = [];

		while (i < len - 1 && charCount < maxLength) {
			if (html[i] === '<') {
				var tagClose = html.indexOf('>', i);

				if (html[i + 1] === '/') {
					tagStack.pop();
				} else {
					tagStack.push(html.slice(i + 1, tagClose));
				}

				i = tagClose + 1;
			} else {
				++charCount; ++i;
			}
		}

		var result = html.slice(0, i);

		for (var j = tagStack.length - 1; j >= 0; --j) {
			var tag = tagStack[j];
			var tagName;
			var spaceIdx = tag.indexOf(' ');
			if (spaceIdx > -1) {
				tagName = tag.slice(0, spaceIdx);
			} else {
				tagName = tag;
			}
			result += '</' + tagName + '>';
		}

		if (opt_addEllipsis) {
			result += '&hellip;';
		}

		return result;
	};
}));

