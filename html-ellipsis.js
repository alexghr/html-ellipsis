/**
 * @module html-ellipsis
 * @version 1.0.0
 * @exports htmlEllipsis
 *
 * @copyright 2014 Alex Gherghisan
 * @license MIT
 */

(function(root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports !== 'undefined') {
		module.exports = factory();
	} else {
		root.htmlEllipsis = factory();
	}
}(this, function factory() {
	'use strict';

	/**
	 * Truncates a string to maxLength chars without destroying HTML tags.
	 * Optionally adds ellipsis to the end of the string (this does not make the string larger than maxLength)
	 *
	 * @param {string} html - The HTML string to truncate. The function assumes valid HTML.
	 * @param {number} maxLength - The max truncated length
	 * @param {boolean} [opt_addEllipsis = false] - Add &hellip; at the end of the string.
	 *
	 * @returns {string}
	 */
	return function htmlEllipsis(html, maxLength, opt_addEllipsis) {
		var len = html.length;
		if (len <= maxLength) {
			return html; 
		}

		// leave room for ellipsis
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
					// assume valid HTML
					tagStack.pop();
				} else {
					tagStack.push(html.slice(i + 1, tagClose));
				}

				i = tagClose + 1;
			} else {
				++charCount;
				++i;
			}
		}

		var result = html.slice(0, i);

		for (var j = tagStack.length - 1; j >= 0; --j) {
			var tag = tagStack[j];

			// extract tagName from <tagName id="maybe">
			var tagName;
			var spaceIdx = tag.indexOf(' ');
			if (spaceIdx > -1) {
				tagName = tag.slice(0, spaceIdx);
			} else {
				tagName = tag;
			}
			result += '</' + tagName + '>';
		}

		if (opt_addEllipsis && result.length < html.length) {
			result += '&hellip;';
		}

		return result;
	};
}));

