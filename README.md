# Transit App (2115 Project)

## Author
- Name: Mariano Suarez  
- GitHub: [marianodeanzorena-byte](https://github.com/marianodeanzorena-byte)  

Estimated self-written code: ~15–20%  
- I wrote the setup, file organization, and added inline comments myself.  
- I adapted generated code to make it fit my project and worked through debugging.  
- AI was used for scaffolding and troubleshooting, but I had to test and fix multiple steps to get something working.

---

## Project Story

At the start, my plan was to connect to **OC Transpo’s open API** (which usually requires an app ID and credentials).  
However, I wasn’t able to find or register working credentials in time — the developer portal and documentation were either outdated or inaccessible.  

Because of this, I pivoted to using **OC Transpo’s public RSS feed** (specifically the “Detours” feed). This feed doesn’t need credentials, but it created new problems:  

- Fetching directly from the browser gave **CORS errors** (the browser blocks requests if the server doesn’t allow them).  
- To get around this, we tried different public CORS proxies (AllOrigins, corsproxy.io). Some worked temporarily, but others gave `404 Not Found` or inconsistent results.  

Since the feed couldn’t be reliably loaded live, I added a **fallback** so the app at least shows example alerts.  
This way, the app is still functional in a demo context, even if the real data can’t always load.

---

## What I Built Step by Step

1. **Set up React project with Vite**  
   - Created a new React project (`pnpm create vite@latest`)  
   - Organized files in `src/`  

2. **Initial API approach**  
   - I prepared `.env.local` with placeholders for an `APP_ID` and `API_KEY`.  
   - When no working credentials were available, I had to abandon this approach.  

3. **Switch to RSS feed**  
   - Replaced the original fetch logic with one that downloads XML from:  
     `https://www.octranspo.com/rss/Detours`  
   - Used `DOMParser` to convert XML into readable JavaScript objects.  

4. **Handle CORS**  
   - Added a proxy URL in the fetch request to bypass browser restrictions.  
   - Example: `https://corsproxy.io/?https://www.octranspo.com/rss/Detours`  
   - Tested different proxies since some didn’t respond.  

5. **App display**  
   - Built a `<button>` that triggers fetching alerts.  
   - Displayed results in a `<ul>` list: each item shows title, date, and link.  
   - Added fallback sample alerts when the fetch fails.  

6. **Commenting the code**  
   - I wrote explanatory comments line by line to show my understanding of how state, fetch, and rendering works.  
   - This was important for me to show that I wasn’t just copy-pasting but actually learning React state and XML parsing.  

---

## Known Issues

- **CORS restrictions**: sometimes the browser blocks the RSS feed entirely, which is out of my control.  
- Because of this, the app might not always show live alerts. The fallback ensures the app still demonstrates the intended functionality.  

---

## How to Run

1. Clone this repo:
   ```bash
   git clone https://github.com/marianodeanzorena-byte/Transit-app.git
   cd Transit-app

2.- Install dependencies:

pnpm install

3.- Start the development server:

pnpm run dev


Open the link shown in terminal (usually http://localhost:5173/
).


Test Case

Click “Load Latest Alerts”

If RSS feed works → live detour alerts appear.

If not → fallback alerts are shown.


Reflection

This project didn’t end up as a fully live transit-tracking app, but I learned:

-How to work with APIs and RSS feeds in React

-The challenges of CORS policies when fetching external data

-How to organize code and use state to display lists dynamically

-The importance of adapting when a first plan doesn’t work

Even though a lot of the scaffolding came from AI, I actively contributed by:

-Writing about 15–20% of the code myself

-Adding detailed comments

-Debugging when things broke

-Adjusting the logic from API → RSS → fallback solution
