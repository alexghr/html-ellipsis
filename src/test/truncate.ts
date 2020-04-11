import { htmlEllipsis } from '../lib';

describe('truncate', () => {
  it.each([
    ['123', 4, '123'],
    ['123', 3, '123'],
    ['123', 2, '12'],
    ['123', 0, ''],
    ['💩', 1, '💩'],
    ['💩foo', 2, '💩f'],
    [span('foo'), 4, span('foo')],
    [span('foo'), 3, span('foo')],
    [span('foo'), 2, span('fo')],
    [span('foo'), 0, '']
  ])('should truncate the text correctly', (str, len, expected) => {
    expect(htmlEllipsis(str, len)).toEqual(expected);
  });

  it.each([
    ['<span>foo', 3, span('foo')],
    [span('<b>foo'), 3, span('<b>foo</b>')],
    // ['<span>foo<br/></span>', 3, '<span>foo<br></span>']
  ])('should handle malformed html', (str, len, expected) => {
    expect(htmlEllipsis(str, len)).toEqual(expected);
  });

  describe('ellipsis', () => {
    const tests = [
      ['123', 2, '1'],
      ['💩foo', 2, '💩'],
      ['<span>foo</span>', 2, 'f']
    ] as const;
    it.each(tests)('should keeps space for ellipsis', (str, len, expected) => {
      expect(htmlEllipsis(str, len, true)).toMatch(expected);
    });

    it.each(tests)('adds &hellip; at the end', (str, len) => {
      expect(htmlEllipsis(str, len, true)).toMatch(/&hellip;$/);
    });
  });

  it('should handle surrogate pairs', () => {
    // the high surrogate of 💩
    expect(htmlEllipsis('\uD83D', 1)).toEqual('\uD83D');
    // 💩 
    expect(htmlEllipsis('\uD83D\uDCA9', 1)).toEqual('💩');
  });
});


function span(inner: string): string {
  return `<span>${inner}</span>`;
}
