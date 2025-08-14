# Project description
This project is part of the bachelor thesis of Thomas Sinner.
The project is an interactive educational game designed to raise awareness of phishing. It simulates a spear phishing process in which players must identify suspicious emails and analyze social media information. The game consists of various missions that are completed step by step.

# Project structure
- **Data Analysis**  
  Located in the `data_analysis` folder, it contains:
  - `analysis.ipynb` – Jupyter Notebook contains the analysis
  - `dataset.csv` – CSV file with the raw survey data
  - `variablen_namen.csv` – CSV file containing the explanation of the raw data

- **Game**  
  All other files and folders are part of the game.

# Compile and Start (Game)

This project uses React and Vite with TypeScript.

Prerequisites
- Node.js (recommended: version ≥ 18)
- npm


Installation
<pre>sh npm install</pre>

To run the game
<pre>sh npm run dev</pre>

Build for production
<pre>npm run build</pre>

The production build will be output to the dist folder.
