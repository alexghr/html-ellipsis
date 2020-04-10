
/**  taken from http://webdesign.about.com/od/htmltags/qt/html-void-elements.htm */
const voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'wbr'];

/**
 * Extracts <tag id="foo"> from a larger string. Assumes str[startIdx] === '<'
 */
export function extractTag(str: string, startIdx: number): string {
  const endIdx = str.indexOf('>', startIdx);
  return str.slice(startIdx, endIdx + 1);
}

/** Checks that <tag> is an end tag */
export function isEndTag(tag: string): boolean {
  return tag[1] === '/';
}

/** Extracts tag from <tag id="foo"> */
export function extractTagName(tag: string): string {
  let tagNameEndIdx = tag.indexOf(' ');
  if (tagNameEndIdx === -1) {
    // check for <br/> style tags
    tagNameEndIdx = tag.indexOf('/');

    if (tagNameEndIdx === -1) {
      tagNameEndIdx = tag.length - 1;
    }
  }

  return tag.slice(1, tagNameEndIdx);
}

/** Checks that tagName is a void tag (it doesn't have an end tag) */
export function isVoidTag(tagName: string) {
  for (let i = voidTags.length - 1; i >= 0; --i) {
    if (tagName === voidTags[i]) {
      return true;
    }
  }

  return false;
}
