# Countries API Application - Version 0

## 👋 Welcome!

Your challenge is to build a website with React.js that pulls country data from the `localData.js` file and displays it like the designs.

## 🎯 Requirements for Version 0

In Version 0, you'll build a mobile-responsive React app that:

- Shows all countries on the Home page using a reusable CountryCard component
- Displays country data from the `localData.js` file
- Is styled according to provided Figma designs

![Example of Version 0 project](https://github.com/user-attachments/assets/79094b58-6856-4491-8fa5-0a394f85f0b9)

## 🔗 Resources

- **Designs:** You will need to use this [Figma file](https://www.figma.com/design/YuEMNteoQic0h6RRiYprpV/Countries-API-Project?node-id=1045-2&p=f&t=T2oSD2lU7TuxaG13-0) for the designs
- **Style Guide:** Refer to the `style-guide.md` file for info about the color palette, fonts, and design.
- **Local Countries Data:** You will use the `localData.js` file to get the country data and flag images

## 📖 Pages & Routes

You will use `react-router` to set up the Routes for 3 pages:

- Home page
- SavedCountries page
- CountryDetail page

Refer to [this react-router guide](https://docs.google.com/document/d/18jxCUA0bebCyYaIHy8aaKMgOQH4w5-b-iCGDWpV4K4M/edit?tab=t.hbxxe6vmm0fq#heading=h.snu4ai1ffrgi) to help you set up your pages, Routes, and Links.

Even though you are setting up the Routes for all 3 pages, you only need to fully build out the Home page so that it displays the country data. You won't need to build out the SavedCountries page and the CountryDetail page until the Backend class starts.

In addition, your App.jsx file should render a header with two links:

![Header of Countries API Project](https://github.com/user-attachments/assets/2a6311a4-70a1-48a5-8f9a-3b44bbad6a3e)

- When the user clicks on "Where in the World?", they should be routed to the Home page
- When the user clicks on "Saved Countries", they should be routed to the SavedCountries page

## ⚙️ Components

Your Version 0 should have the following 2 components: CountryCard and CountryCardList.

### CountryCard

This component displays data for a single country

![CountryCard component which displays data for a single country](https://github.com/user-attachments/assets/78528aa5-655c-4b2c-add7-319bfde63143)

### CountryCardList

This component maps over the array of data from the `localData.js` file and renders a list of `CountryCard` components

![CountryCardList component which displays a list of CountryCard components](https://github.com/user-attachments/assets/b69c6d6b-e06c-440f-8b1a-a342fc16f245)

## 📝 Tips for building your project

1. **Pseudo-code before you write any code!** Look through the designs to plan out how you'll tackle the project. Write down your plan somewhere in this README or in your code.
2. **Work on one feature at a time.** Finish one feature first before you move onto the next thing. Test as you go, routinely checking your site in the browser and making sure there are no errors before moving on.
3. **Comment your code generously — Future You will thank you.** You’ll be building on top of this project over the next 3 months, so help yourself out by writing clear, helpful comments that explain what your code is doing. Trust us, it will save you time and confusion later.
4. **Clean up your code as you go**. Rename confusing variables, remove unused code, and organize your logic. Your code should read like a newspaper: clear, easy to follow, and understandable at a glance.

## 🚀 Roadmap: Step-by-step guide to building your project

### Fork & Clone the Github repo

1. Fork this Github repo into your own account. Use this [fork and clone guide](https://docs.google.com/document/d/18jxCUA0bebCyYaIHy8aaKMgOQH4w5-b-iCGDWpV4K4M/edit?tab=t.55gk3qetux2a#heading=h.wbbot8ebr58a) to help you.
2. Clone your new Github repo into the `dev` folder on your local machine.

### Create a new React project with Vite

1. In the terminal, navigate into your repo and then into the `version-0` folder
2. In the `version-0` folder, create a new React project with [Vite](https://vite.dev/). Use this [How to create a new project with Vite guide](https://docs.google.com/document/d/18jxCUA0bebCyYaIHy8aaKMgOQH4w5-b-iCGDWpV4K4M/edit?tab=t.rxwa6murqe1y#heading=h.wvxq6966uco7) to help you.
3. Push your code to Github!

### Set up Routes with `react-router`

Refer to this [react-router guide](https://docs.google.com/document/d/18jxCUA0bebCyYaIHy8aaKMgOQH4w5-b-iCGDWpV4K4M/edit?tab=t.hbxxe6vmm0fq#heading=h.snu4ai1ffrgi) as you do the following steps:

1. In the terminal, in your `version-0` folder, install the `react-router` package using the command `npm install react-router`.
2. In App.jsx file, set up Routes for 3 pages: Home page, SavedCountries page, and CountryDetail page.
3. In App.jsx, render a header that contains two links:
   - "Where in the world?" should link to the Home page
   - "Saved Countries" should link to the SavedCountries page
4. In the `src` folder, create a `pages` folder
5. In the `pages` folder, set up components for each page by making these 3 files: Home.jsx, SavedCountries.jsx, and CountryDetail.jsx
6. In App.css, style the header
7. Don't forget to push your code to Github!

### In the Home page, display localData from `localData.js` file

1. In Home.jsx, import the `localData.js` file. This file contains all of the data about each country as an array of objects.
2. In Home.jsx, display all of the data about each country. Create the CountryCard and CountryCardList components.
3. In App.css, style the Home page, CountryCard, and CountryCardList components according to the Figma designs
4. Don't forget to push your code to Github!

### Clean and Comment your code

1. Clean up your code by renaming confusing variables, removing unused code, and organizing your logic. Your code should read like a newspaper: clear, easy to follow, and understandable at a glance.
2. Comment your code generously — Future You will thank you. You’ll be building on top of this project over the next 3 months, so help yourself out by writing clear, helpful comments that explain what your code is doing. Trust us, it will save you time and confusion later.
3. Don't forget to push your code to Github!

### Submit to Canvas, and prepare for your demo

1. Submit the Github repo link to Canvas.
2. Be ready to demo what you've got on Day 1 of Backend — complete or not. We want to see your thinking and progress! 💡

### Stretch Goals (optional — only do these if you have completed _all_ of the above steps)

Finished all the steps above? Amazing!  
Keep leveling up by tackling this next challenge:

- 🧾 Creating the form on the SavedCountries page  
  [Figma Design for the Form](https://www.figma.com/design/YuEMNteoQic0h6RRiYprpV/Countries-API-Project?node-id=1-329&t=eKfO5eJcdQC03CrI-4)
