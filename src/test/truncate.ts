import { htmlEllipsis } from "../lib";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("truncate", () => {
  (
    [
      ["123", 4, "123"],
      ["123", 3, "123"],
      ["123", 2, "12"],
      ["123", 0, ""],
      ["💩", 1, "💩"],
      ["💩foo", 2, "💩f"],
      [span("foo"), 4, span("foo")],
      [span("foo"), 3, span("foo")],
      [span("foo"), 2, span("fo")],
      [span("foo"), 0, ""],
    ] as const
  ).forEach(([str, len, expected]) => {
    it("should truncate the text correctly", () => {
      assert.equal(htmlEllipsis(str, len), expected);
    });
  });

  (
    [
      ["<span>foo", 3, span("foo")],
      [span("<b>foo"), 3, span("<b>foo</b>")],
      // ['<span>foo<br/></span>', 3, '<span>foo<br></span>']
    ] as const
  ).forEach(([str, len, expected]) => {
    it("should handle malformed html", () => {
      assert.equal(htmlEllipsis(str, len), expected);
    });
  });

  describe("ellipsis", () => {
    const tests = [
      ["123", 2, /^1/],
      ["💩foo", 2, /^💩/],
      ["<span>foo</span>", 2, /^<span>f/],
    ] as const;

    tests.forEach(([str, len, expected]) => {
      it("should keep space for ellipsis", () => {
        assert.match(htmlEllipsis(str, len, true), expected);
      });

      it("adds &hellip; at the end", () => {
        assert.match(htmlEllipsis(str, len, true), /&hellip;$/);
      });
    });
  });

  it("should handle surrogate pairs", () => {
    // the high surrogate of 💩
    assert.equal(htmlEllipsis("\uD83D", 1), "\uD83D");
    // 💩
    assert.equal(htmlEllipsis("\uD83D\uDCA9", 1), "💩");
  });
});

function span(inner: string): string {
  return `<span>${inner}</span>`;
}
