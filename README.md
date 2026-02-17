# RuneScape PvM Hub

![RuneScape PvM Hub Screenshot Placeholder](https://via.placeholder.com/1200x600?text=RuneScape+PvM+Hub+Interface)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
  - [PvM Guide Editor](#pvm-guide-editor)
  - [Preset Maker](#preset-maker)
  - [Gear Simulator](#gear-simulator)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Simulated RuneScape API](#simulated-runescape-api)
- [AI Integration (Google Gemini API)](#ai-integration-google-gemini-api)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The RuneScape PvM Hub is a web-based application designed to assist RuneScape players in mastering Player-versus-Monster (PvM) content. Inspired by community resources like pvme.io, this hub centralizes essential tools for PvM planning, including a guide editor, a gear preset maker, and a comprehensive gear simulator.

Whether you're a seasoned boss killer or just starting your PvM journey, this hub aims to streamline your preparation, optimize your setups, and enhance your overall PvM experience.

## Features

### PvM Guide Editor

Create, edit, and manage personalized guides for any RuneScape boss. The editor supports Markdown formatting, allowing you to craft detailed and well-structured strategies.

-   **AI-Powered Drafts**: Utilize the integrated Google Gemini API to generate initial guide drafts for specific bosses, helping you kickstart your writing process.
-   **Markdown Support**: Write and view guides with proper headings, lists, bold text, and other rich text formatting.
-   **Local Storage**: All guides are saved directly in your browser's local storage, ensuring your content persists across sessions.

### Preset Maker

Design and save optimal gear and inventory setups for various PvM encounters. This tool helps you quickly switch between different styles (e.g., melee, ranged, magic, hybrid) and ensures you have all necessary items for a fight.

-   **Dynamic Item Search**: Search for RuneScape items using a simulated API to equip your character.
-   **Gear Slots & Inventory**: Populate all standard gear slots (Head, Amulet, Cape, Weapon, Shield, Body, Legs, Hands, Feet, Ring, Ammunition, Aura, Pocket) and a 28-slot inventory.
-   **Save & Load Presets**: Store multiple presets for different bosses or combat styles and load them with a click.

### Gear Simulator

Experiment with different equipment combinations to understand their impact on your character's stats. This allows for informed decision-making when optimizing offensive and defensive capabilities.

-   **Real-time Stat Calculation**: Instantly view combined attack, strength, magic damage, range strength, defence, armour, life points, and prayer bonuses as you equip items.
-   **Dynamic Item Selection**: Use the item search modal to easily find and equip items into any gear slot.
-   **Clear All**: Reset your gear with a single button click to start a new simulation.

## Technologies Used

The RuneScape PvM Hub is built with modern web technologies to provide a responsive and intuitive user experience.

-   **React**: A JavaScript library for building user interfaces.
-   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
-   **Tailwind CSS**: A utility-first CSS framework for rapidly styling components.
-   **React Router Dom**: For declarative routing in the React application.
-   **React Markdown**: For rendering Markdown content within React components.
-   **Google Gemini API**: Integrated for generating AI-powered guide drafts.
-   **Simulated RuneScape API Service**: A mock API to fetch item data, demonstrating future real-world data integration.

## Installation

To get the RuneScape PvM Hub running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd runescape-pvm-hub
    ```
    *(Note: Replace `<repository-url>` with the actual URL if this were a Git repository.)*

2.  **Install dependencies:**
    This project assumes a standard `package.json` setup and `npm` or `yarn`.
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Google Gemini API Key:**
    The AI Guide Editor feature requires a Google Gemini API key.
    -   Obtain an API key from the [Google AI Studio](https://ai.google.dev/).
    -   Set your API key as an environment variable named `API_KEY`. The application is configured to read `process.env.API_KEY`.
        *   If running locally with a tool like `Vite` or `Create React App`, you might prefix it as `VITE_API_KEY` or `REACT_APP_API_KEY` in a `.env` file. For this project's simple setup, ensure `process.env.API_KEY` is available in your build environment.

4.  **Run the application:**
    ```bash
    npm start
    # or
    yarn start
    ```
    This will typically open the application in your browser at `http://localhost:3000` (or another port).

## Usage

Navigate through the application using the sidebar or the top navigation bar.

-   **Home**: Overview of the PvM Hub.
-   **Guide Editor**: Create new guides, edit existing ones, or generate AI drafts for specific bosses.
-   **Preset Maker**: Assemble gear and inventory items, then save or load your custom presets.
-   **Gear Simulator**: Select items for each gear slot to see real-time combined stats.

## Simulated RuneScape API

For demonstration purposes and to avoid reliance on external, potentially rate-limited or unavailable third-party APIs during development, this project utilizes a **simulated RuneScape API service (`services/runescapeApiService.ts`)**.

This service:
-   Contains an internal mock database of various RuneScape items.
-   Simulates network latency with `setTimeout` for `fetchItems` and `fetchItemDetails` calls.
-   Provides dynamic search functionality for items, similar to what a real API would offer.

This approach allows the Preset Maker and Gear Simulator to function realistically, with item searching and detail fetching, without requiring a live connection to a RuneScape item database. It's designed to be easily swappable with a real API integration in the future.

## AI Integration (Google Gemini API)

The **PvM Guide Editor** leverages the Google Gemini API to offer an AI-powered guide drafting feature. When you select a boss and click "Generate Draft (AI)", the application sends a prompt to the Gemini model, requesting a comprehensive guide outline and content.

This significantly speeds up the guide creation process, providing a structured starting point that users can then refine and customize. The AI model used is `gemini-3-flash-preview` to balance generation quality and speed.

## Project Structure

```
.
├── public/                       # Static assets
├── src/
│   ├── components/               # Reusable UI components (Button, Card, Input, Modal, Select, Sidebar, Navbar, TextArea)
│   ├── pages/                    # Main application pages (HomePage, GuideEditorPage, PresetMakerPage, GearSimulatorPage)
│   ├── services/                 # External API integrations (geminiService, runescapeApiService)
│   ├── App.tsx                   # Main application component and routing
│   ├── constants.ts              # Global constants (GEAR_SLOTS, INVENTORY_SIZE, BOSS_LIST)
│   ├── index.tsx                 # React app entry point
│   └── types.ts                  # TypeScript global types and interfaces
├── index.html                    # Main HTML file
├── metadata.json                 # Application metadata
└── README.md                     # Project documentation (this file)
```

## Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please consider:

1.  Forking the repository.
2.  Creating a new branch (`git checkout -b feature/your-feature-name`).
3.  Making your changes.
4.  Committing your changes (`git commit -m 'feat: Add new feature'`).
5.  Pushing to the branch (`git push origin feature/your-feature-name`).
6.  Opening a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details. (Note: A `LICENSE` file would be created in a real project).

## Contact

For any questions or feedback, please reach out to:
-   **Your Name/Handle**: [Your Link/Email]
-   **Project Issues**: [Link to Project Issues if hosted]
