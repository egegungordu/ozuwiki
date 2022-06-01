<p align="center">
  <h1 align="center">OzuWiki<br></br></h1>

  <p align="center">
    OzuWiki brings the latest information on Özyeğin University to the web. Faculties, Courses, Departments, Clubs, Events, and more, through the lens of the Özyeğin University Students.
    <br>
  </p>

</p>

- [Quick start](#quick-start)
  - [Optional](#optional)
- [Dependencies Explained](#dependencies-explained)
- [File structure](#file-structure)
- [Detailed project description](#detailed-project-description)
- [Responsibilities of the project members](#responsibilities-of-the-project-members)

## Quick start

This project was bootstrapped using [create-react-app](https://create-react-app.dev/). To run the app on your local machine, follow the instructions:

- Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
  > Node 14 or higher is required.
- Clone the repository with `git clone https://github.com/egegungordu/ozuwiki.git`
- Change directory to `ozuwiki` with `cd ozuwiki`
- Install the dependencies with `npm install`
- Start the development build with `npm start`
  > This deploys the app to [http://localhost:3000](http://localhost:3000), with a mock database served at [http://localhost:3005/db](http://localhost:3005/db).

### Optional

- Web app and the mock database can be deployed seperately with `npm start:react` and `npm start:server`

## Dependencies Explained

TODO: more detail

- [axios](https://npmjs.com/package/axios) - HTTP client for making HTTP requests
- [bootstrap](https://getbootstrap.com/) - CSS framework for making responsive web apps
- [json-server](https://www.npmjs.com/package/json-server) - Local mock database
- [npm-run-all](https://www.npmjs.com/package/npm-run-all) - Run multiple commands in parallel
- [react-bootstrap](https://react-bootstrap.github.io/) - React components for Bootstrap
- [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) - React router for handling routes
- [react-icons](https://react-icons.netlify.com/) - React icon components
- [react-use](https://www.npmjs.com/package/react-use) - Many useful hooks for React
- [uuid](https://www.npmjs.com/package/uuid) - Generate unique IDs
- [react-markdown](https://www.npmjs.com/package/react-markdown) - Markdown renderer component
- [remark-gfm](https://www.npmjs.com/package/remark-gfm) - Plugin for markdown renderer to parse Custom GFM syntax

## File structure

```text
src/
├── api/     (api abstractions)
├── context/ (custom react contexts)
├── hooks/   (custom hooks)
├── components/
│   ├── common/   (common components)
│   └── pages/    (page components)
│       ├── Home/
│       ├── Article/
│       ...
```

## Detailed project description

TODO: more detail

OzuWiki is a project that aims to provide the latest information on Özyeğin University to the web, free of charge.

All of the articles on the site are made up of student contributions, where students can submit new article and edit existing ones. All submissions are reviewed by the site administrators.

The app uses a main component called `WikiPage` for all pages that ensure uniform design and navigation. This component also exposes the sidebar control, which is used to toggle the sidebar on small screens.

- The site has a main landing page, which lists ...
- Article page contains the article content, and a form for submitting new articles.
- ...

## Responsibilities of the project members

TODO: more detail

**Ege Güngördu**

- Contribution to the design and implementation of the `WikiPage`
  - Nested components design with functions for designated page areas
  - `WikiOffcanvas`
  - `WikiSidebar`
- Database schema design
- Implementation of the `Article` page
  - Handling of markdown syntax
  - Table of content generation from markdown article
- Implementation of the `Contribute` page
  - Custom form validation

**Kaan Yılmaz**

- Contribution to the design and implementation of the `WikiPage`
  - Responsive design for the component elements
  - `WikiFooter`
  - `WikiBody`
- Database api implementation
  - Reading and writing articles
  - Reading and writing contributions
- Implementation of search system
- Design of the search page

**Fatih Alperen Zengin**

- Contribution to the design and implementation of the `WikiPage`
  - Context design and NavbarItem design
  - `WikiNavbar`
  - `WikiNavbarItem`
  - `WikiHistory`
- Implementation of the `Home` page
  - Populating the "Recently visited pages" section
  - Poulating the "All articles list"
- Idea and implementation the New Article contribution system
