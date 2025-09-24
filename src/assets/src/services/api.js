// src/services/api.js
// Code skeleton generated with assistance from OpenAI'
// Student contribution: 20% (I did not author this skeleton). Adapted for 2115.
// Purpose: small helper functions to parse and fetch routes from PTTWA.

export function parseRoutes(apiResponse) {
    // Safely extract the Route object(s) and always return an array
    const routes = apiResponse?.GetRouteSummaryForStopResult?.Routes?.Route;
    if (!routes) return [];
    return Array.isArray(routes) ? routes : [routes];
  }
  
  export async function fetchRoutesForStop(stopNo) {
    // Reads Vite env vars: VITE_PTTWA_BASE_URL, VITE_PTTWA_APP_ID, VITE_PTTWA_API_KEY
    const base = import.meta.env.VITE_PTTWA_BASE_URL || "https://api.octranspo1.com";
    const appId = import.meta.env.VITE_PTTWA_APP_ID || "";
    const apiKey = import.meta.env.VITE_PTTWA_API_KEY || "";
  
    if (!appId || !apiKey) {
      throw new Error("Missing API credentials. Please set VITE_PTTWA_APP_ID and VITE_PTTWA_API_KEY in .env.local");
    }
  
    const url = `${base}/v2.0/GetRouteSummaryForStop?appID=${encodeURIComponent(appId)}&apiKey=${encodeURIComponent(apiKey)}&stopNo=${encodeURIComponent(stopNo)}&format=json`;
  
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Network error: HTTP ${res.status}`);
    const data = await res.json();
    return parseRoutes(data);
  }
  