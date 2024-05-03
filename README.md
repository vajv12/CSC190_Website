# Great Escape Games Website Revamp
*Worked on by SoftGroup*

<sub>Team members: Anuja Chouhan, Alexis Dawatan, Vayhout Lim, Chris Long, Dzmitry Matsiulka, Shari Nguyen, Bruno Reviglio, Voua Vang</sub>

<img src="src/assets/GEG-logo.png"
alt="CSS logo" width="30%" height="30%">
<img src="https://cdn-icons-png.flaticon.com/512/1322/1322195.png" alt="partnership handshake" width="15%" height="15%">
<img src ="public/image/Soft Group Logo.png" alt="SoftGroup Logo" width="30%" height="30%">

# Synonsis

In CSC 190, our focus has been working with our client: Gary Lane. He is the owner of Great Escape Games, a local store specializing in board games and collectables. Gary's existing website is an outdated website that is counterproductive as it no longer serves the client's needs. Our primary task is to revamp the website and create a modernized interface while also adding new pages and functions that the old website did not have. Our goal is to create an interactive and dynamic website that will help the client better serve his customers' needs enhancing customer-client interaction. Throughout this semester, Soft Group has worked together to find the most suitable languages, IDE, API's, and databases for this project. We created ER Diagrams and prototype pages. Once we established the design, we proceeded into the developmental phase which included coding the front-end and the database. As the semester comes to an end, we discuss how we are proceeding with our work onto the upcoming semester and what we are hoping to achieve.




# Programming Languages <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png" alt="CSS logo" width="7%" height="10%"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1024px-HTML5_logo_and_wordmark.svg.png" alt="HTML logo" width="10%" height="10%"><img src="https://media.licdn.com/dms/image/D4E12AQFFYnJcaBca2A/article-cover_image-shrink_720_1280/0/1692721264999?e=2147483647&v=beta&t=M1fXs-4m7O8-N-1un-6AWU6sJqck1jOyymr4G5UOamg" alt="HTML logo" width="10%" height="10%">

The programming languages we are using throughout this project are CSS, HTML, and React. We chose these languages as it is fundamental to use when creating a dynamic website.

# IDE <img src="https://ubuntu.com/wp-content/uploads/c9f4/visualstudio_code-card.png" alt="VSCode logo" width="14%" height="14%">
The IDE of choice is Visual Studio Code (VSCODE) as everyone in the group has experience with it and is user-friendly.

# Database <img src="https://firebase.google.com/static/downloads/brand-guidelines/PNG/logo-standard.png" alt="Firebase logo" width="10%" height="10%">
FireBase is chosen as the backend and database, the reason being it is a simple application to use along with development options that work well with our plan for the application. 


# ERD
The ERD is shown below:

<img src="src/components/images/ERD.JPG" alt="ERD" width="100%" height="100%">

# Prototype <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Figma-1-logo.png" alt="Figma logo" width="5%" height="5%">

We utilized Figma to help map out our website dynamics. It was also used to inform our client of a clear and concise picture of what steps we are planning to take.
Below we have provided a quick look into our layout. <a href="https://www.figma.com/file/AbiVev09xmJ9DRe81yQ1bO/Great-Escape-Games?type=whiteboard&node-id=0%3A1&t=VvZZ1qSWYkgmuEbh-1">For more details click here.
</a> 

<img src="src/components/images/prototype.JPG" alt="prototype" width="50%" height="50%">


# Project Product 

#### Home page 
#### Product
#### Events
#### Private Rooms
#### About 
#### Contact 
#### Login 
#### Signup

# Setup Environment
GitHub
Pull code from respiratory:
(https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

To run react files:
[See Getting Starting with Create React App](#Getting-Started-with-Create-React-App)


FireBase setup:
(https://firebase.google.com/docs/hosting/github-integration#:~:text=You%20can%20integrate%20deploys%20to,PR%20on%20your%20GitHub%20repository.)


# Testing

## Step-by-Step Testing Guide Using Jest and Selenium IDE

### Setting Up the Test Environment

#### Prerequisites:
- Ensure you are using a **Windows 10 Home** operating system.
- Ensure you have installed **Google Chrome Version 123 (Official Build) (64-bit)**; if not, install it from [Google Chrome's official download site](https://www.google.com/chrome/). Using a newer version likely will still work.
- Ensure you have installed **Selenium IDE Chrome Extension Version 3.17.2**; if not, install it from [Chrome Web Store's official site](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd) or from the [Selenium IDE's official GitHub Page](https://github.com/SeleniumHQ/selenium-ide/releases) for older versions. Using a newer version likely will still work.
- Ensure you have **Git** installed; if not, install it from [Git's official site](https://git-scm.com/downloads).
- Ensure you have **Yarn** installed; if not, install it from [Yarn's official site](https://yarnpkg.com/getting-started/install).

#### Pull the Code and Test Scripts:	
1. Open command prompt.
2. Navigate to the directory where you want to clone the repository using the following command: cd /path/to/your/directory
3. Pull the code and test scripts from the repository with the following command:
git clone https://github.com/vajv12/CSC190_Website.git
cd CSC190_Website

#### Install Dependencies:
Run the following command to install all necessary dependencies listed in the `package.json` file:
yarn install

#### Set Up Jest Testing Library:
Ensure you are using **Jest version 1.22.10**.
   - Check with: 
     ```
     yarn -v jest
     ```
   - If Jest is missing or is a different version, install Jest 1.22.10 using the following command:
     ```
     yarn add jest@1.22.10 --dev
     ```

### Running Tests

#### Running Unit Tests with Jest:
- To run a specific test file, use the following command in your terminal:
yarn test example.test.js (Replace `example.test.js` with the path to the test file you want to execute. Available test files can be found in the project folder under `CSC190_Website/src/tests/UnitTests/…`.)
- To run additional test files, use `CTRL+C` to close out of the current test and run the following command again with a different test file name: yarn test example.test.js


#### Running Integration Tests with Selenium IDE:
- Open Chrome and click on the Selenium IDE extension icon in the top right of the browser window.
- Open the testing file that is found in the project folder under `CSC190_Website/src/tests/SeleniumTests/CSC191.side`.
- Select an individual test and then click the triangle shaped play button to run the test.
- For tests that sign a user in, make sure to sign them out after each test or it may interfere with other tests.


# Deployment

## Overview
Our application utilizes Firebase Hosting to serve our website and essential services, including Firebase Authentication, Firebase Storage, and Firestore. The deployment process is automated using GitHub Actions, ensuring seamless updates to our live environment.

## Source Code Management
The source code is managed on GitHub, enabling efficient collaboration and change tracking.

## Repository Structure
- **Main Branch**: Stores production-ready code, triggering automatic deployment to the live environment.

## Continuous Deployment Pipeline
Our deployment pipeline, powered by GitHub Actions, facilitates continuous integration and deployment.

### Steps in the Deployment Pipeline
1. **Code Update**: Developers push updates to the main branch directly or via pull requests after code review.
2. **Build Trigger**: Updates to the main branch trigger the GitHub Actions workflow.
3. **Build Process**:
   - Dependencies are installed, and the code is compiled and tested.
   - Only successful tests proceed to deployment.
4. **Deployment**:
   - The build artifact is prepared and deployed to Firebase Hosting.
   - Utilizes a global CDN for optimal performance.
5. **Post-Deployment**:
   - Updated website version becomes instantly accessible.
   - Continuous monitoring ensures functionality and performance.

## Firebase Services
Key Firebase services integrated into our deployment:
- **Firebase Authentication**: Supports various authentication methods for secure access.
- **Firebase Storage**: Ensures data persistence and security for user-generated content.
- **Firestore**: Enables real-time data synchronization across devices.

## Maintenance and Monitoring
Regular maintenance and proactive monitoring ensure operational excellence:
- System logs are routinely examined for irregularities or errors.
- Firebase Analytics provides insights into user behavior and system performance.


# Developers Instruction

Continue in CSC191



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
