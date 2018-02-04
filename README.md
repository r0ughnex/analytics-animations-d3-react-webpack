## Analytics Animations with D3 and React

### Table of Contents

- [A Brief Overview](#a-brief-overview)
- [Links to Staging](#links-to-staging)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
    - [npm start](#npm-start)
    - [npm test](#npm-test)
    - [npm run build](#npm-run-build)

### A Brief Overview

This project is an extension of two individual **technical tests** combined into one, which contains a sample **hero** and **chart component** written in **React** (with **Webpack**) for an analytics platform containing data-driven graph animations run with the help of **D3**.

### Links to Staging

```
NAME: analytics-animations-d3-react-webpack
AUTHOR: Pradeep Sekar

REPOSITORY:
https://github.com/r0ughnex/analytics-animations-d3-react-webpack

AWS STAGING (develop):
http://analytics-animations-d3-react-webpack.develop.s3-website-ap-southeast-2.amazonaws.com

AWS STAGING (master):
http://analytics-animations-d3-react-webpack.master.s3-website-ap-southeast-2.amazonaws.com
```

### Getting Started

Install the latest **LTS** version of **Node** and it's package manager, which can be found [here](https://nodejs.org/en/) (which were **8.9.1** and **5.5.1** at the time of writing this document). Once Node in installed on your machine, open the terminal or command prompt at the root of the project directory and run the following commands.

```
npm install -g webpack
npm install
npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see the app run on the **local development** server. There is **no need to configure** tools like Webpack or Babel, since they have already been pre-configured so that you can focus on the code.

<p align="center">
    <img src="https://github.com/r0ughnex/analytics-animations-d3-react-webpack/blob/master/src/App.video.gif?raw=true" width="600" height="auto" alt="npm start">
</p>



## Available Scripts

This project was **Bootstrapped** with and ejected from [Create React App](https://github.com/facebookincubator/create-react-app). Additonal configuration options, so as to be able to use features (and tools) like **Enzyme**, **CSS Modules** and **Pre-rendering** (or minimalist Server Side Rendering) have been added the the build. In the root project directory, you can run the following commands:

### `npm start`

This runs the app in the development mode. You can open [http://localhost:3000](http://localhost:3000) to view it in the browser. The current view will reload if you make edits to and save any of the files imported within the app. You will also see **ESLint errors in the console**.

### `npm test`

This launches the **Jest test runner** in interactive watch mode. The tests will reload if you make edits to and save any of the files imported within the app. You can also filter (or skip) and drill-down into each test suite using the commands displayed on the console.

### `npm run build`

This builds the app for production to the **build** folder. It correctly bundles React in production mode and optimizes the build for best performance. It also does **Pre-rendering by taking snapshots** of all the **routes configured in the package.json** file. The build files are minified and the filenames include hashes. The app is now ready to be deployed!

### `serve -s build`

This launches the app in Pre-rendered **production mode** (once built) on your local machine using a Node server. You can open [http://localhost:5000](http://localhost:5000) to view it in the browser, or follow the instructions and link displayed in the console to view it on a **mobile device** connected to the same network.



## Deploying to AWS S3

There are two **AWS S3 buckets** that have been configured for this project, one on **develop** and another on **master**. If you want a **new AWS S3 bucket** created on a specific **feature branch** that you are currently working on, contact someone who has admin access to this repository, to create and configure one for you.

### Staging for Develop

If you are on a **feature branch** and want to deploy to the bucket configured on develop, then **merge your feature branch into develop** through a pull request and get it approved. Once the pull request is approved, merged and commited into develop, **Codeship will automatically compile, bundle and build** the neccessary files and deploy it to the relevant AWS S3 bucket configured on that branch (links listed at the top).

### Staging for Master

If you are on **develop** and want to deploy to the bucket configured on master, then use git flow to create a new **release branch** from develop and **merge the release branch into master**. Once the release is merged and commited into master, **Codeship will automatically compile, bundle and build** the neccessary files and deploy it to the relevant bucket configured on that branch (links listed at the top).
