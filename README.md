 # 🧩 Minimal DESK – A Beautiful Custom New Tab Extension
Minimal DESK is a sleek, fast, and personalized Chrome extension that replaces your new tab with a focused dashboard. 

### It includes:

- 🌅 Time-based greetings
- ⛅ Local weather
- ✅ To-do list
- 🔔 Birthday reminders (optional)
- 🔍 Utility shortcuts
- ⚡️ Blazing-fast, minimal UI

## 📦 Features
1. Personalized greeting with your name
2. Weather forecast using Geolocation + Open-Meteo API
3. Daily to-dos with persistent storage
4. Minimalist design using TailwindCSS
5. Works offline after install
6. Local data storage via chrome.storage

## 🚀 Getting Started
1. Clone the Repository
   ```angular2html
   git clone https://github.com/MrXgupta/minimal-desk.git
   cd minimal-desk
    ```

2. Install Dependencies
    ```
   npm install
   ```
   
3. Build the Extension
    ```
   npm run build
   ```
   
   This will output a dist/ folder with the compiled extension.

4. Load into Chrome
   - Go to chrome://extensions
   - Enable Developer mode (top-right)
   - Click "Load unpacked"
   - Select the dist/ folder

You're done! Open a new tab and enjoy 🧘

## 🛠️ Development Mode
Use the development server:
```angular2html
npm run dev
```
You'll still need to manually reload the extension in Chrome after changes.

### ✏️ Customization
- Modify default widgets or add new ones in /src/components

- Update styles in tailwind.config.js

- Background image, color, and transitions can be customized in App.jsx or your custom background component

### 🌐 Tech Stack
1. React.js

2. Tailwind CSS

3. Vite

4. Open-Meteo API

5. Chrome Extension APIs

### 📦 Folder Structure

````angular2html
minimal-desk/
├── public/
├── src/
│   ├── components/
│   ├── styles/
│   └── App.jsx
├── manifest.json
├── vite.config.js
└── README.md
````

## 📝 License
This project is open-source under the MIT License.

## 💡 Contribute
Found a bug or have a feature request?

1. Fork the repo

2. Create a new branch

3. Submit a PR

_Let’s make productivity beautiful together ✨_

## ☕ Support

If you find this project helpful, consider buying me a coffee:

<a href="coff.ee/mrxgupta" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="45" width="170" />
</a>
