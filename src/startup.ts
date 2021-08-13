import Spoonge  from './models/spoonge';
import Database from "./utils/database";
import Logger from "./utils/logger";
import Commands from './models/commands';
import dotenv from 'dotenv';

dotenv.config();

const db = new Database();
const spoonge = new Spoonge();
const commands = new Commands();
const log = new Logger();

/* Start bot system */
log.load()
    .then(() => db.start()
    .then(() => spoonge.login()
    .then(() => spoonge.loadModules()
    .then(() => commands.load()
))));