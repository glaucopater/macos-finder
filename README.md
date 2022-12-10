# Getting Started with Trello Clone

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

After some consideration on the UI I implemented the skeleton of the application, starting from the ui
components, then the state manager, then adding all the required actions for managing the MacOs Finder.
At the end I focused on improving performance and UI/UX aspects.

# State manager 🏬

For the state management my choice went on implementing a simple state manager based on React Context (in order to share a store in different part of the application) and a custom hook using useReducer.
All the logic about dispatching actions (adding, editing, moving, removing files) are delegated to it.
The state is persisted in the browser Localstorage.

# UI 🎨

- No external UI library is used, emojis are used in place of icons.
- Drag and drop between folder is possible, this is implemented through the drag API of JavaScript.
- The header of each folder/column shows the number of existing files.
- I opted for deleting a file instead of Trello's approach where the file are archived.

# Models 📐

The application considers three main models: Finder, Folder, File.

- A Finder is a container of Folders and Files
- A Folder is a container of Folders and or Files
- A file contains a name and an id

# Tests 🧪

I focused only on the business logic of the application and not on the rendering logic.

# Ship to prod 🚢

Thanks to husky each commit /push perform unit tests, eslint, prettify the code.
Then deploy it on netlify (demo).

## Available Scripts

In the project directory, you can run:

### `yarn`

Install all dependencies and husky hooks

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`
