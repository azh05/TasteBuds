# TasteBuds
TasteBuds is a food-based dating and friend-making app where users can swipe on and match with other users from different locations. Users will get recommended restaurants based on their cuisine preferences. 

## Running the application
Run `git clone https://github.com/azh05/TasteBuds.git`

Ensure npm is installed on your computer. Look at https://docs.npmjs.com/downloading-and-installing-node-js-and-npm if either are not installed. 

Change into the correct directory, with `cd TasteBuds/tastebuds-site`. 
Then, run `npm start`. This starts the frontend on http://localhost:3000
* If react-scripts is not found, run `npm install react-scripts`

Open up another terminal, go to the `TasteBuds/tastebuds-site` repository again. Then, `cd src/backend`. Once in the backend repository, run `npm start`. This starts the backend on http://localhost:5001. 
* To confirm that the backend is running correctly, the messages `Server is running on port 5001` and `Connected to MongoDB` should be displayed after running `npm start`. If the second message is not displayed, please email us!