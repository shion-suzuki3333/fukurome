import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  parseBinQuery,
  parseCmInput,
  rankBags,
  serializeBinQuery,
} from "./bag-fit";

describe("parseCmInput", () => {
  it("strips non-digits and clamps", () => {
    assert.equal(parseCmInput("32cm"), 32);
    assert.equal(parseCmInput("abc"), null);
    assert.equal(parseCmInput("1"), 5);
    assert.equal(parseCmInput("999"), 200);
  });
});

describe("rankBags", () => {
  it("recommends 45L for mid kitchen rect bin", () => {
    const ranked = rankBags({
      shape: "rect",
      widthCm: 32,
      depthCm: 28,
      heightCm: 50,
    });
    assert.equal(ranked[0]?.bag.label, "45L");
    assert.ok(
      ranked[0]?.status === "best" || ranked[0]?.status === "ok",
      `unexpected status ${ranked[0]?.status}`,
    );
  });

  it("marks tiny bags as small for wide rim", () => {
    const ranked = rankBags({
      shape: "rect",
      widthCm: 40,
      depthCm: 35,
      heightCm: 60,
    });
    const ten = ranked.find((r) => r.bag.id === "10l");
    assert.ok(ten);
    assert.equal(ten.status, "small");
  });
});

describe("query serialize", () => {
  it("round-trips safely", () => {
    const q = serializeBinQuery({
      shape: "rect",
      width: "32",
      depth: "28",
      height: "50",
    });
    const parsed = parseBinQuery(q);
    assert.deepEqual(parsed, {
      shape: "rect",
      width: "32",
      depth: "28",
      height: "50",
    });
  });
});

describe("round bin", () => {
  it("ranks a compact round bath bin toward 20L/30L band", () => {
    const ranked = rankBags({
      shape: "round",
      widthCm: 22,
      heightCm: 30,
    });
    assert.ok(ranked[0]);
    assert.ok(["20L", "30L", "10L"].includes(ranked[0].bag.label));
    assert.ok(
      ranked[0].status === "best" ||
        ranked[0].status === "ok" ||
        ranked[0].status === "tight" ||
        ranked[0].status === "oversized",
    );
  });
});
