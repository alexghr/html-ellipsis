var test = require('tape');
var truncate = require('../html-truncate');

// sample strings
var text = "1234567890"; // length = 10
var html = "<p><span>1234</span><b>567<i>890</i></b></p>"; // length = 10 (not counting tags)

// regex used to find tags
var tagRe = /(<.+?>)/g;

test('should return same string if length = maxLength', function(t) {
	t.plan(4);
	t.equals(truncate(text, text.length), text, 'no tags');
	t.equals(truncate(html, html.length), html, 'with tags');
	t.equals(truncate(text, text.length, true), text, 'no tags, ellipsis = true');
	t.equals(truncate(html, html.length, true), html, 'with tags, ellipsis = true');
});

test('should return same string if length < maxLength', function(t) {
	t.plan(4);
	t.equals(truncate(text, text.length + 1), text, 'no tags');
	t.equals(truncate(html, html.length + 1), html, 'with tags');
	t.equals(truncate(text, text.length + 1, true), text, 'no tags, ellipsis = true');
	t.equals(truncate(html, html.length + 1, true), html, 'with tags, ellipsis = true');
});

test('should truncate a normal text without tags', function(t) {
	var length = 5;
	var result = truncate(text, length);

	t.plan(2);
	t.equals(result.length, length, 'result should have the expected length');
	t.equals(result, text.slice(0, length), 'result should be a prefix of text');
});

test('should truncate a html string', function(t) {
	var length = 5;
	var result = truncate(html, length);
	var textContent = result.replace(tagRe, '');
	var originalTextContent = result.replace(tagRe, '');

	t.plan(2);
	t.equals(textContent.length, length, 'result textContent should have expected length');
	t.equals(textContent, originalTextContent.slice(0, length), 'result textContent should be a prefix of original textContent');
});

test('should close open tags when truncating a html string', function(t) {
	var length = 5;
	var result = truncate(html, length);
	var splits = result.split(tagRe);

	// tags are on odd indices
	var tags = splits.filter(function(split, i) { return i % 2 === 1; });

	t.plan(1);
	t.doesNotThrow(function() {
		var tagStack = [];
		tags.forEach(function(tag) {
			var tagName;
			// end tag
			if (tag.slice(0, 2) === '</') {
				// extract tag from </tag>
				tagName = tag.slice(2, -1);

				// last pushed tag on the stack
				var tip = tagStack[tagStack.length - 1];
				if (tip === tagName) {
					tagStack.pop();
				} else {
					throw new Error('Mismatched tags: ', tip, tagName);
				} 
			} else {
				// extract tag from <tag id="foo">
				var spaceIdx = tag.indexOf(' ');
				if (spaceIdx > -1) {
					tagName = tag.slice(1, spaceIdx);
				} else {
					tagName = tag.slice(1, -1);
				}
				tagStack.push(tagName);
			}
		});

		if (tagStack.length > 0) {
			throw new Error('Some tags got left opened: ' + JSON.stringify(tagStack));
		}
	}, null, 'tags are properly closed');
});

test('should add &hellip; when truncating', function(t) {
	var length = 5;
	var hellip = '&hellip;';
	var resultText = truncate(text, length, true);
	var resultHtml = truncate(html, length, true);

	t.plan(2);
	t.equals(resultText.slice(-hellip.length), hellip, 'no tags');
	t.equals(resultHtml.slice(-hellip.length), hellip, 'with tags');
});
