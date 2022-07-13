import mariadb from 'mariadb';

/*
if the database is not running in a container, host should be: host.docker.internal
if the database is running in a container, host should be the IP address of the database container. Available by using docker inspect <containerID> | grep 'IPAddress'.
the database information is stored in env variables defined in the docker file for safety.
*/
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// method to make a new connection
    function getConnection(){
      return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
          resolve(connection);
        }).catch(function(error){
          reject(error);
        });
      });
    }
  
export {getConnection};
