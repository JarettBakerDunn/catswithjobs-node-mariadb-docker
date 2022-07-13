# node-mariadb-test

### About this project:

This project uses a nodeJS server connected to a mariaDB database, running a javascript game in the front end. Along with a team, I created the game 'cats with jobs' during Spring 2022 as a class project for Macalester College's COMP-225 (Software Development) course. I made the nodejs server, database, and javascript/html/css login page on my own following the conclusion of the course. The node server uses the expressJS framework. The frontend uses AJAX to handle logins and saving game information. The login page is plain javascript/css/html (no frameworks are used). The javascript game was created using the Phaser framework and bundled via webpack before being included in this project. The server and database run in separate docker containers. The database can be recreated using the 'cats_with_jobs_dump.sql' file (created using mysqldump).

The repository for the javascript game can be found here: https://github.com/ecozbel/comp225-project-cats


### Database Design:

<img src="cd-LDS.png" width="400">

The database design is extremely simple, with one relation each to store users and cats. There is a one-to-many relationship between user and cat. User is identified by userID, cat is identified by a combination of catID and userID. The node-mariadb connect sends a JSON file to the frontend. Within the game, the data is extracted from the recieved JSON and used to build a separate javascript object which represents the cat in the game world.


### Future Work:

- Currently, the project will store the username/password of a logged in user in session storage so that the game can make API calls to save and load information. It would be better to use a more secure method of storing credentials, perhaps JWT tokens.
- Currently, the database stores passwords in plaintext. For this reason I don't recommend using a password that you care about when using this project. In the future, the server should hash and salt the passwords before storing them.
- The error messages in the frontend are hard coded. It would be better to load them from a file so that the site can be localized more easily.

### docker commands:

docker run --name mariadb-cats -v  /path-to-directory:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=rootpass -d mariadb:latest
docker exec -i docker-image-id mysql -u root -prootpassword cats_with_jobs < /path/cats_with_jobs_dump.sql

build: docker build -t cats-node-mariadb-main .
run: docker run -p 8080:8080 --add-host host.docker.internal:host-gateway cats-node-mariadb-main

Storing these commands here for my own use. --add-host host.docker.internal:host-gateway is needed on linux if the database is not also dockerized. If the database is dockerized that command is not needed, and you can connect to the database by using its IP address (available within the container's command line).
