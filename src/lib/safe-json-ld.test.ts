import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { safeJsonLd } from "./safe-json-ld";

describe("safeJsonLd", () => {
  it("escapes script-breaking characters", () => {
    const html = safeJsonLd({
      note: "</script><script>alert(1)</script>",
    });
    assert.equal(html.includes("</script>"), false);
    assert.equal(html.includes("<"), false);
    assert.ok(html.includes("\\u003c"));
  });
});
