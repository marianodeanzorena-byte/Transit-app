import { useState } from "react";

// This file is NOT the main app being submitted.
// It documents my earlier attempts before switching to the fallback solution in App.jsx.
// I left this here to show the process I followed.

export default function AppApiAttempt() {
  const [alerts, setAlerts] = useState([]);

  // ---------------------------
  // ATTEMPT 1: Official OC Transpo API
  // ---------------------------
  // Problem: Could not get working credentials (AppID and ApiKey),
  // so this code was never able to run successfully.
  async function fetchFromApi() {
    try {
      const appID = "YOUR_APP_ID"; // placeholder
      const apiKey = "YOUR_API_KEY"; // placeholder
      const routeNo = "95"; // example bus route number

      const response = await fetch(
        `https://api.octranspo1.com/v1.2/GetNextTripsForStop?appID=${appID}&apiKey=${apiKey}&routeNo=${routeNo}`
      );
      const data = await response.json();

      console.log("API data:", data);
      // Would normally parse and set state here
    } catch (error) {
      console.error("Error with OC Transpo API:", error);
    }
  }

  // ---------------------------
  // ATTEMPT 2: RSS Feed
  // ---------------------------
  // Problem: Ran into CORS errors when fetching from the browser.
  // Tried using proxies like corsproxy.io and allorigins, but they failed or returned 404.
  async function fetchFromRss() {
    try {
      const response = await fetch(
        "https://corsproxy.io/?https://www.octranspo.com/rss/Detours"
      );
      const text = await response.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");

      const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
        title: item.querySelector("title")?.textContent,
        link: item.querySelector("link")?.textContent,
        pubDate: item.querySelector("pubDate")?.textContent,
      }));

      setAlerts(items);
    } catch (error) {
      console.error("Error fetching RSS:", error);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚍 Transit App – API Attempts</h1>

      {/* Buttons to run each attempt */}
      <button onClick={fetchFromApi}>Try API (won’t work)</button>
      <button onClick={fetchFromRss}>Try RSS (CORS blocked)</button>

      <ul>
        {alerts.map((item, i) => (
          <li key={i}>
            <strong>{item.title}</strong>
            <br />
            <small>{item.pubDate}</small>
            <br />
            <a href={item.link} target="_blank">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
