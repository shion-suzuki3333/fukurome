import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveSiteUrl } from "./site";

describe("resolveSiteUrl", () => {
  it("prefers NEXT_PUBLIC_SITE_URL and strips trailing slash", () => {
    assert.equal(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: "https://fukurome.vercel.app/",
        VERCEL_PROJECT_PRODUCTION_URL: "other.vercel.app",
      }),
      "https://fukurome.vercel.app",
    );
  });

  it("falls back to Vercel production host", () => {
    assert.equal(
      resolveSiteUrl({
        VERCEL_PROJECT_PRODUCTION_URL: "fukurome.vercel.app",
      }),
      "https://fukurome.vercel.app",
    );
  });

  it("falls back to VERCEL_URL for preview-like hosts", () => {
    assert.equal(
      resolveSiteUrl({
        VERCEL_URL: "fukurome-git-main-user.vercel.app",
      }),
      "https://fukurome-git-main-user.vercel.app",
    );
  });

  it("uses local dev origin when no env is set", () => {
    assert.equal(resolveSiteUrl({}), "http://127.0.0.1:43123");
  });
});
