## PokeTrader

This project is a simple pokemon trader simulator. Front-end made with `ReactJS` and back-end made with `NodeJS`, using a postgresql as database.

### Execute front-end

To run front-end, enter on front end directory and execute `yarn install`. After that, simply execute `yarn start`, and it will be available at port 3000.

### Execute back-end

To run back-end, enter on back end directory and execute `yarn install`. After that, execute `yarn dev:server`, for live reload.

### Setup Database

I recommend using postgresql with docker. With docker installed, execute command `docker run --name postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=postgres -e POSTGRES_DB=poketrader -p 5432:5432 -d postgres`. With database up, run `yarn typeorm migration:run`. And that's it! 

