<h1 align="center"> Clear-BnB</h1>

<h3 align='center'> The clear place to find your next vacation rental </h3>

## [Link to Live Site](https://clear-bnb.herokuapp.com/)</h2>

### Splash Page
You can sign up for an account or just use the demo user's creditials.

INSERT SPLASH PAGE IMAGE HERE

### Checkout Properties and Book a Trip
You can look at properties on the site and book a property for a trip on particular dates.

INSERT SINGLE PROPERTY VIEW HERE

### MANGE PROPERTIES
You can add a property to the site with picture uploads to display what your property looks like.  You can also update your property later. 

INSERT PROPERTY CREATION FORM IMAGE HERE

### MANAGE TRIPS
You can modify or cancel your trip as needed. 

INSERTY EDIT TRIP PAGE HERE. 

### Review Properties
You can review a property with ratings to let the owner and other users know about your experience.  You can also edit your review later if you changed your mind. 

INSERT LEAVE REVIEW IMAGE HERE


## Clear-Bnb Description
Clear Bnb is a full stack applicaiton made to mirror the functionality of Air Bnb.  A signed up user and view properties and make bookings for vacations or other trips. They can also review their experince with the property. 

## Running the App Locally

1. Clone the repository

```
git clone git@github.com:stili87/Clear-BnB.git

```

2. Install dependencies

- In root folder, install Python server.

```
pipenv install
```

- Navigate to React-app folder, install React

```
cd React-app
npm install
```

3. Setup your PostgreSQL user, password and database

```
psql
CREATE USER clear_bnb_dev WITH PASSWORD 'password';
CREATE DATABASE clear_bnb_db WITH OWNER clear_bnb_dev;

```

4. create a .env file in root folder, based on the .env.example with proper settings for your development environment

5. Migrate and seed your database in root folder

```
pipenv run flask db upgrade
pipenv run flask seed all

```

6. Start the server

- In root folder

```
pipenv run flask run
```

- Navigate to React-app folder

```
npm start
```


## Application Technologies

Clear Bnb is built on React and Redux frontend with Python/Flask backend, using PostgresSQL as a database and SQL Alchmeny to access the database.

### Technologies Used

- [Docker](https://www.docker.com/)
- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Javascript](https://www.javascript.com/)
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.1.x/)
- [Flask SQL Alchmeny](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
- [Flask Alembic](https://flask-alembic.readthedocs.io/en/stable/)
- [PostgresSQL](https://www.postgresql.org/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Later Improvements
To be more effective, Clear Bnb needs to achive Google Maps integration so users can know exactly where thier property is located.  As a long term goal, chat with the owners of the properties would be great for users to be able to communicate with the hosts. 

## Developer Contact

Andrew Stilinovic

<a href='https://www.linkedin.com/in/andrew-stilinovic-94277180/'>Linked-in</a>

<a href='https://github.com/stili87'>Github</a>

stili87@gmail.com
