# Countries API Application - Version 0

## 👋 Welcome!

Your challenge is to build a website with [React.js](https://reactjs.org) that pulls country data from the [REST Countries API](https://restcountries.com) and displays it like the designs.

## 🎯 Project Goals

Required Goals for Version 0 of the project:

- Mobile responsive application build with React.js/Vite
- Countries data is pulled from the [REST Countries API](https://restcountries.com)
- As a user, I can see all countries from the API on the homepage, with data displayed about each country

**NOTE: Sometimes the REST Countries API can go down. We've added a `data.json` file with all the country data. You should use this as a backup, if the API responds with an error.**

## 🔗 Resources

- **Designs:** You will need to use this [Figma file](https://www.figma.com/design/YuEMNteoQic0h6RRiYprpV/Countries-API-Project?node-id=1045-2&p=f&t=T2oSD2lU7TuxaG13-0) for the designs
- **Style Guide:** Refer to the `style-guide.md` file for info about the color palette, fonts, and design.
- **API:** You will use the [REST Countries API](https://restcountries.com) to get the country data and flag images

## 📝 Tips for building your project

1. Work on one feature at a time. Finish one feature first before you move onto the next thing. As a metaphor, if we are making dinner, we should start with making each dish before we get hung up on choosing the plates and dinnerware. Otherwise we'll have a bunch of nice plates but no food on the table!
2. Look through the designs to start planning out how you'll tackle the project. This step is crucial to help you think ahead for CSS classes to create reusable styles.
3. Write out the base styles for your project, including general content styles, such as `font-family` and `font-size`.
4. Start adding styles to the top of the page and work down. Only move on to the next section once you're happy you've completed the area you're working on.

## 🚀 Roadmap: Step-by-step guide to building your project

### Step 1: Project Setup

1. Fork this Github repo into your own Github account, then clone your new Github repo into your local machine. You can use this [fork and clone guide](https://docs.google.com/document/d/18jxCUA0bebCyYaIHy8aaKMgOQH4w5-b-iCGDWpV4K4M/edit?tab=t.55gk3qetux2a#heading=h.wbbot8ebr58a) to help you.
2. In the terminal, use `cd` to navigate to your new local repo called countries-api-project.
3. In the terminal, inside your countries-api-project repo, create a `version-1` folder. You can do this by running the command `mkdir version-1`. This `version-1` folder is where you will code your Countries API project!
4. In the terminal, `cd` into the `version-1` folder, and then create a new React project with [Vite](https://vite.dev/)
5. In the terminal, inside the `version-1` folder, install [React Router](https://reactrouter.com/home) package using `npm install react-router`
6. Push your code to Github!

### Step 3: Display Country Data on the Home page from data.json file

1. On the Home page, display country data from the data.json file
2. Style the country data according to the Figma designs
3. Don't forget to push your code to Github!

### Step 4: Create API Call to REST Countries API

1. On the Home page, create API call that pulls countries data from the [REST Countries API](https://restcountries.com) using useEffect
2. Display data from API call on the Home page, instead of displaying data from data.json
3. Push your code to Github!

### Step 5: Create Header

1. Create the Header component, which will be displayed on each page.
2. Style the Header component
3. Clicking on "Where in the world?" should link to the Home page, and clicking on "Saved Countries" should link to the SavedCountries page.
4. Push your code to Github!

### Stretch Goals (optional — only do these if you have completed _all_ of the above steps)

1. Once you've completed Version 0, check out the instructions for Version 1 to keep building your app!
