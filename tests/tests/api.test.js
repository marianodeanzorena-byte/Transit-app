// tests/api.test.js
// Tests for the small parsing helper in src/services/api.js
// Generated with assistance from ChatGPT. Student contribution: add/run tests.

import { describe, it, expect } from "vitest";
import { parseRoutes } from "../src/services/api";

describe("parseRoutes", () => {
  it("returns empty array when API response missing routes", () => {
    expect(parseRoutes({})).toEqual([]);
  });

  it("wraps single Route object into array", () => {
    const mock = {
      GetRouteSummaryForStopResult: {
        Routes: {
          Route: { RouteNo: "95", RouteHeading: "Orleans" }
        }
      }
    };
    const out = parseRoutes(mock);
    expect(Array.isArray(out)).toBe(true);
    expect(out[0].RouteNo).toBe("95");
  });

  it("returns array unchanged when API returned array", () => {
    const mock = {
      GetRouteSummaryForStopResult: {
        Routes: {
          Route: [{ RouteNo: "95" }, { RouteNo: "97" }]
        }
      }
    };
    const out = parseRoutes(mock);
    expect(out.length).toBe(2);
  });
});
