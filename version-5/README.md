# 🌍 Countries API App -2025

## 📌 About this project

### This is a web app where you can explore countires from all around the world, see details about them, and save your favorites. You can search for a country,, switch between light and dark mode, and keep track of how many times you've viwed a country. There is also a "MyProfile" page where you can add youe name ansd details, and it all stays saved in the backend database even after you refresh the page.

## 🚀 Live Site

### [click link] (https://countries-api-app-2025.netlify.app/)

## 📸 Screenshots 📸

### (app.jsx) Main page light and dark mode!

### Country Detail Page!

### Saved Countries Page!

## 💫 Features

### • View a list of all countries with their flags, population, and region

### • Click a country to see extra details like capital, borders, and more

### • Save countries to your own list

### • Fill out a profile form that’s stored in the backend

### • See how many times you’ve viewed each country

### • Toggle between dark mode and light mode

### • Works on desktop, tablet, and mobile

## 👩🏻‍💻 Tech Stack 👩🏻‍💻

### Frontend

### • React with React Router

### • HTML, CSS, JavaScript

### • Fetch API for backend communication

### Backend

### • Node.js with Express

### • Neon Console for PostgreSQL database

### • pg library for connecting to the database

### • Postman for backend API's

### Other Tools

### • Netlify for frontend hosting

### • Render for backend hosting

### • REST Countries API for country data

### • DBFiddle for SQl database

## 🔌 API Endpoints

### Here’s what the backend supports:

### Profile

### • GET /get-newest-user – Gets the most recently saved profile.

### • POST /add-one-user – Saves a new profile to the database.

### Saved Countries

### • GET /get-saved-countries – Returns a list of all saved countries.

### • POST /add-saved-country – Adds a country to the saved list.

### Country Views

### • GET /get-country-views – Returns how many times each country has been viewed.

### • POST /increment-country-view – Increases the view count for a specific country.

## 💻How to Run the Project on Your Computer💻

### 1. Download or clone this repository from GitHub.

### 2. Open two terminals one for server and one for client (if you rename them it will be easier to go back and forth between the two)

### 3. Start the backend server (for example, with 'node index.js' in the server folder).

### 4. Start the frontend (for example, with npm run dev in the client folder).

### 5. Open your browser and go to http://localhost:5173 to use the app.

## 💭 What I Learned

### • How to connect a React app to an Express and PostgreSQL backend

### • How to save data to a database so it stays there between sessions

### • How to make a mobile-friendly layout

### • How to deal with CORS and API issues

## 🚧 Future Plans

### • Add user login so each person has their own saved countries

### • Add sorting options like population, size, or alphabetical order

### • Make it work offline so saved countries can be viewed without internet

## 🙌 Credits

### • REST Countries API for the country data

### • PostgreSQL and Express documentation for backend help

### • Netlify and Render for hosting both sides of the app

### • Last but not least my classmates and instructors at Annie Cannons
