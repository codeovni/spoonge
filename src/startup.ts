import Spoonge  from './helpers/spoonge';
import Database from "./utils/database";
import Logger from "./utils/logger";
import dotenv from 'dotenv';

dotenv.config();

const db = new Database();
const spoonge = new Spoonge();
const log = new Logger();

/* Start bot system */
log.load()
    .then(() => db.start()
    .then(() => spoonge.login()
    .then(() => spoonge.loadEvents()
    .then(() => spoonge.loadCommands()
))));