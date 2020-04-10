import { extractTag, isEndTag, extractTagName, isVoidTag } from './tags';

/**
 * Truncates a string to maxLength chars without destroying HTML tags.
 * Optionally adds ellipsis to the end of the string (this does not make
 * the string longer than `maxLength`)
 *
 * @param html - The HTML string to truncate. The function assumes valid HTML.
 * @param maxLength - The max truncated length
 * @param addEllipsis - Add &hellip; at the end of the string.
 * @returns The shortened string
 */
export function htmlEllipsis(
  html: string,
  maxLength: number,
  addEllipsis = false,
): string {
  const len = html.length;
  if (len <= maxLength) {
    return html;
  }

  // leave room for ellipsis
  if (addEllipsis) {
    --maxLength;
  }

  let i = 0;
  let charCount = 0;
  const tagStack = [];

  while (i < len && charCount < maxLength) {
    const char = html.charAt(i);
    const charCode = html.charCodeAt(i);

    if (char === '<') {
      const tag = extractTag(html, i);

      // skip content between < and >
      i += tag.length;

      if (isEndTag(tag)) {
        tagStack.pop();
      } else {
        const tagName = extractTagName(tag);

        if (!isVoidTag(tagName)) {
          tagStack.push(tagName);
        }
      }
    } else {
      // if charCode is a high surrogate and if the string contains a
      // low surrogate then count the pair as a single character
      if (charCode >= 0xD800 && charCode <= 0xDBFF && i + 1 < len) {
        ++i;
      }

      ++charCount;
      ++i;
    }
  }

  let result = html.slice(0, i);

  for (let j = tagStack.length - 1; j >= 0; --j) {
    result += '</' + tagStack[j] + '>';
  }

  if (addEllipsis && result.length < html.length) {
    result += '&hellip;';
  }

  return result;
}
