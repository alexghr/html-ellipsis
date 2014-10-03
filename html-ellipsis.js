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

	/** Extracts <tag id="foo"> from a larger string. Assumes str[startIdx] === '<' */
	function extractTag(str, startIdx) {
		var endIdx = str.indexOf('>', startIdx);
		return str.slice(startIdx, endIdx + 1);
	}

	/** Checks that <tag> is an end tag */
	function isEndTag(tag) {
		return tag[1] === '/';
	}

	/** Extracts tag from <tag id="foo"> */
	function extractTagName(tag) {
		var tagNameEndIdx = tag.indexOf(' ');
		if (tagNameEndIdx === -1) {
			// check for <br/> style tags
			tagNameEndIdx = tag.indexOf('/');

			if (tagNameEndIdx === -1) {
				tagNameEndIdx = tag.length - 1;
			}
		}

		return tag.slice(1, tagNameEndIdx);
	}

	// taken from http://webdesign.about.com/od/htmltags/qt/html-void-elements.htm
	var voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'wbr'];

	/** Checks that tagName is a void tag (it doesn't have an end tag) */
	function isVoidTag(tagName) {
		for (var i = voidTags.length - 1; i >= 0; --i) {
			if (tagName === voidTags[i]) {
				return true;
			}
		}

		return false;
	}

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

		while (i < len && charCount < maxLength) {
			if (html[i] === '<') {
				var tag = extractTag(html, i);

				// skip content between < and >
				i += tag.length;

				if (isEndTag(tag)) {
					tagStack.pop();
				} else {
					var tagName = extractTagName(tag);

					if (!isVoidTag(tagName)) {
						tagStack.push(tagName);
					}
				}
			} else {
				++charCount;
				++i;
			}
		}

		var result = html.slice(0, i);

		for (var j = tagStack.length - 1; j >= 0; --j) {
			result += '</' + tagStack[j] + '>';
		}

		if (opt_addEllipsis && result.length < html.length) {
			result += '&hellip;';
		}

		return result;
	};
}));

