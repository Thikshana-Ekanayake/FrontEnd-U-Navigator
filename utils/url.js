// src/utils/url.js
import { api } from "../src/api/client";

export function absoluteUrl(path) {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    const base = (api?.defaults?.baseURL || "").replace(/\/$/, "");
    const rel  = String(path).startsWith("/") ? path : `/${path}`;
    return `${base}${rel}`;
}
