import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("should return null when authorization header is missing", () => {
    const headers = {};
    expect(getAPIKey(headers)).toBe(null);
  });

  test("should return null when authorization header is empty", () => {
    const headers = { authorization: "" };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("should return null when authorization header has wrong prefix", () => {
    const headers = { authorization: "Bearer secret123" };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("should return null when authorization header has only prefix", () => {
    const headers = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("should return API key when authorization header is valid", () => {
    const headers = { authorization: "ApiKey secret123" };
    expect(getAPIKey(headers)).toBe("secret123");
  });

  test("should return API key with special characters", () => {
    const headers = { authorization: "ApiKey abc-def_123.456" };
    expect(getAPIKey(headers)).toBe("abc-def_123.456");
  });
});
