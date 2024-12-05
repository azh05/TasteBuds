TasteBuds
A Dating App for Foodies

Description
Users can create an account, log into their account, edit their profile, swipe on other profiles, and view their matches. A profile consists of an email, password, name, zip code, age, gender, and cuisine preferences. When swiping (liking or disliking) profiles, you can filter them by city. When you like someone, they are removed from the list of profiles you can view and a like is added to their profile, but when you dislike someone, they are kept in the rotation. When viewing your matches, you have the option to click on a match which will allow you to view their profile and have their email address as a means of contact. 

How to set up
First ensure you have installed the most recent version of Node.js from https://nodejs.org/download/.

To access TasteBuds please clone the git repository from GitHub:
git clone https://github.com/azh05/TasteBuds/

Then cd into the folder TasteBuds/tastebuds-site, which is where all of the source code is located:
cd TasteBuds/tastebuds-site

Install the necessary dependencies from package-lock.json:
npm install

Next you must start the backend by running npm start in the folder backend.  You can do this by running the commands:
cd src/backend
npm start

Verify that the terminal says “Server running on port 5001. Connected to MongoDB.”

Start the frontend in the tastebuds-site folder, assuming you are currently in backend:
cd ../..
npm  start

Verify that the terminal says “webpack compiled” and then it should open up a tab in your browser with the URL http://localhost:3000/.

You should now be able to interact with the web application.