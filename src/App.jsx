import { useState } from "react";

function App() {
  const [detours, setDetours] = useState([]);
  const [error, setError] = useState("");

  async function fetchRSS() {
    try {
      // Try to fetch real RSS feed through AllOrigins
      const response = await fetch(
        "https://api.allorigins.win/get?url=https://www.octranspo.com/rss/Detours"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch feed");
      }

      const data = await response.json();
      const text = data.contents; // the actual RSS text

      // Parse RSS feed
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");
      const items = xml.querySelectorAll("item");

      const parsed = Array.from(items).map((item) => ({
        title: item.querySelector("title")?.textContent,
        description: item.querySelector("description")?.textContent,
      }));

      setDetours(parsed);
      setError("");
    } catch (err) {
      console.error("Fetch failed, using fallback data:", err);

      // 🔥 Fallback sample data
      const sampleRSS = [
        {
          title: "Detour on Bank Street",
          description: "Route 7 is on detour between 9am–3pm.",
        },
        {
          title: "Construction on Rideau Street",
          description: "Expect delays on routes 1 and 9.",
        },
      ];

      setDetours(sampleRSS);
      setError("⚠️ Live feed unavailable, showing sample data.");
    }
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>OC Transpo Detours</h1>
      <button
        onClick={fetchRSS}
        style={{
          background: "#e31837",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "6px",
        }}
      >
        Load Detours
      </button>

      {error && <p>{error}</p>}

      <ul>
        {detours.map((detour, index) => (
          <li key={index}>
            <strong>{detour.title}</strong>
            <p>{detour.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
