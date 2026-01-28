# MTG Commander Tracker

A desktop application for tracking your Magic: The Gathering Commander (EDH) games, deck performance, and statistics.

![Electron](https://img.shields.io/badge/Electron-40.0.0-47848F?logo=electron&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?logo=windows&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

### Download
Download the latest portable `.exe` from the [Releases](https://github.com/CuriousFrost/MTG_Commander_Tracker_App/releases) page.

No installation required - just run the executable!
## Features

### Deck Management
- Create and manage multiple Commander decks
- Import decklists directly from [Moxfield](https://www.moxfield.com/)
- View decklists in a clean modal popup with category organization
- Copy decklists to clipboard in standard text format
- Quick link to EDHREC for any commander
- Archive/retire decks you no longer play (keeps historical data)

### Game Logging
- Log games with date, deck used, and opponents faced
- Smart win/loss detection - automatically determines winning color identity
- Autocomplete search for 3,000+ legal commanders
- Track up to 5 opponents per game

### Statistics Dashboard
- Total games, wins, losses, and win rate
- Current and best win/loss streaks
- Top 3 most-faced commanders with card images
- Visual charts powered by Chart.js:
  - Win/Loss pie chart
  - Games over time (monthly)
  - Deck performance comparison
  - Wins by color identity
- Filter stats by year or view lifetime data
- Detailed deck performance table

### Game History
- Comprehensive game log with filtering:
  - Filter by deck, result, date range, or opponent
- Export to CSV or JSON for backup/analysis
- Delete individual games

### Customization
- 5 color themes:
  - **Default (Blue)** - Dark blue with gold accents
  - **Light Mode** - Clean light theme
  - **Comfy (Warm)** - Warm browns and cream colors
  - **True Dark** - Discord-style dark mode
  - **Monokai** - VS Code Monokai inspired

## Screenshots

*Coming soon*

## Installation

### Build from Source

1. Clone the repository:
   ```bash
   git clone https://github.com/CuriousFrost/MTG_Commander_Tracker_App.git
   cd MTG_Commander_Tracker_App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm start
   ```

4. Build the executable:
   ```bash
   npm run build
   ```
   The portable `.exe` will be created in the `dist/` folder.

## Tech Stack

- **Framework:** [Electron](https://www.electronjs.org/) 40.0.0
- **Build Tool:** [electron-builder](https://www.electron.build/)
- **Charts:** [Chart.js](https://www.chartjs.org/) 3.9.1
- **Icons:** [Mana Font](https://mana.andrewgioia.com/) for MTG mana symbols
- **APIs:**
  - [Scryfall](https://scryfall.com/docs/api) - Commander data and card images
  - [Moxfield](https://www.moxfield.com/) - Decklist imports

## Data Storage

All data is stored locally in JSON files:
- `commanders.json` - Cached commander data from Scryfall
- `myDecks.json` - Your deck collection (not tracked in git)
- `games.json` - Your game history (not tracked in git)

Your personal data never leaves your machine.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

ISC License

## Acknowledgments

- Card data provided by [Scryfall](https://scryfall.com/)
- Mana symbols from [Mana Font](https://mana.andrewgioia.com/) by Andrew Gioia
- Decklist imports powered by [Moxfield](https://www.moxfield.com/)

---

*Magic: The Gathering is a trademark of Wizards of the Coast LLC. This application is not affiliated with or endorsed by Wizards of the Coast.*
