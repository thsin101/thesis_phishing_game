# Project description
This project is part of the bachelor thesis of Thomas Sinner.

The project is an interactive educational game designed to raise awareness of phishing. It simulates a spear phishing process in which players must identify suspicious emails and analyze social media information. The game consists of various missions that are completed step by step.

The game will be public available to play until the 31.10.2025 under the following Link: [INSERT]
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
# Some Insights into the game

The start of the game beings with a guidance robot, that explains the whole context:
<img width="1918" height="943" alt="Bild1" src="https://github.com/user-attachments/assets/b1254836-38a6-45b3-b8d8-854e7553c28d" />

The user need to select the mission, he wants to play:
<img width="1288" height="347" alt="Bild2" src="https://github.com/user-attachments/assets/aa0550b0-947f-4dd2-8809-ad8678a63c2f" />

Mission 2, where the user needs to identify the information that should never be shared publicly:
<img width="913" height="911" alt="Bild3" src="https://github.com/user-attachments/assets/2c15c943-1758-4e96-b9fe-510794b574b0" />
