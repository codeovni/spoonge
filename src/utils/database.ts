import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Logger from "./logger";

dotenv.config();

const log = new Logger();

const cluster = process.env.DATABASE_CLUSTER;       // Cluster from cloud.mongodb.com
const db_name = process.env.DATABASE_NAME;          // Database name
const db_user = process.env.DATABASE_USERNAME;      // Database username
const db_pass = process.env.DATABASE_PASSWORD;      // Database password

const connection = mongoose.connection;
const database = `mongodb+srv://${db_user}:${db_pass}@${cluster}/${db_name}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }

export default class Database {
    /**
     * Database connection events
     *
     * @memberof Database
     */
    start() {
        return new Promise((resolve, reject) => {

            mongoose.connect(database, options);
            mongoose.pluralize(null);

            connection.on('connected', () => {
                log.info('MongoDB has successfully connected');
                resolve(true);
            });

            connection.on('error', (err) => {
                log.error('MongoDB error:');
                log.error(err);
                resolve(false);
            });

            connection.on('disconnected', () => {
                log.info('MongoDB has been disconnected');
                resolve(false);
            });
        });
    }
    /**
    * Show collection data
    *
    * @param {string} collection
    * @param {object} values
    * @return {*} {Promise<Object>}
    * @memberof Database
    */
    select(collection:string, values:object): Promise<Object> {
        return new Promise((resolve) => {
            connection.db.collection(collection, function (err:any, res:any) {
                res.find(values).toArray(function(err:string, results:any) {
                    if(err) { log.error('Select error:\n' + err); resolve(false); }
                    resolve([true, results]);
                });
            });
        });
    }

    /**
     * Insert data into a collection
     *
     * @param {string} collection
     * @param {object} values
     * @return {*} {Promise<Boolean>}
     * @memberof Database
     */
    insert(collection:string, values:object): Promise<Boolean> {
        return new Promise((resolve) => {
            connection.db.collection(collection).insertOne(values).catch((err) => { log.error(err); });
            resolve(true);
        });
    }

    /**
    * Update data in a collection
    *
    * @param {string} collection
    * @param {object} values
    * @param {object} where
    * @return {*} {Promise<Boolean>}
    * @memberof Database
    */
    update(collection:string, values:object, where:object): Promise<Boolean> {
        return new Promise((resolve) => {
            connection.db.collection(collection).updateOne(where, { $set: values });
            resolve(true);
        });
    }

    /**
     * Remove data from a collection
     *
     * @param {string} collection
     * @param {object} value
     * @return {*}  {Promise<Boolean>}
     * @memberof Database
     */
    remove(collection:string, value:object): Promise<Boolean> {
        return new Promise((resolve) => {
            connection.db.collection(collection).deleteOne(value);
            resolve(true);
        });
    }
}