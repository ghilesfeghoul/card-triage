# Patient Card Triage

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It represents my solution to the CardTriage challenge proposed by [Cardiologs](https://cardiologs.com/). 

I used [React Bootstrap](https://react-bootstrap.netlify.app/) for the UX/UI design

## Features
- Fetch the patient cards from the local web server created with json server
- Display the patient cards in the corresponding column (_Pending_ + _Rejected_ and _Done_)
- Allow user to change the card status from _Pending_ or _Rejected_ to _Done_ and from _Done_ to _Rejected_.
- Add a local filtering by patient name and arrhythmia.

In addition, I added some new features like:
- Add a new patient card to the _Pending_ column
- Update the patient card information (name, arrhythmias)
- Remove a patient card from the corresponding column

It also includes some and non-exhaustive tests, just for the demo.

## Available Scripts
To run this project in development environment, jump to the root folder (card-triage if you cloned this repo as it), and run `npm start` after you install all dependencies `npm i`

To run tests, open the app folder and run `npm test`

To run this project in production environment, make sure you started json server (server folder location on the root directory), then open the app folder and build it with the following command `npm run build`

Make sure you have _serve_ installed in your machine and run `serve -s build`
