import fs from 'fs';
import kleur from 'kleur';
import dateFormat from 'dateformat';

const root = fs.realpathSync('./');
var numLog:number = 0;

var SPOONGE_PREFIX:string = kleur.yellow('[Spoonge]');

export default class Logger {
	/**
	 * Load folders
	 *
	 * @memberof Logger
	 */
	load() {
		return new Promise((resolve) => {

            /* Create folders */
			this.createFolder(root + '/logs/info');
			this.createFolder(root + '/logs/debug');
			this.createFolder(root + '/logs/error');
			this.createFolder(root + '/logs/command');
			this.createFolder(root + '/logs/warns');

            /* Define log number */
			this.logNumber(root + '/logs/info');
			this.logNumber(root + '/logs/debug');
			this.logNumber(root + '/logs/error');
			this.logNumber(root + '/logs/command');
			this.logNumber(root + '/logs/warns');

            /* Create log files */
			this.createFile('info');
			this.createFile('debug');
			this.createFile('error');
			this.createFile('command');
			this.createFile('warns');

			resolve(true);

		});
	}
	/**
	 * Information log
	 *
	 * @param {*} message
	 * @memberof Logger
	 */
	info(message:any) {

		/* Log data */
		let prefix = `${SPOONGE_PREFIX} [INFO]`;
		let time = dateFormat(new Date(), "HH:MM:ss");

		/* Console log */
		var coloredMessage = `[${time}] ${prefix} ${message}`;
		console.log(coloredMessage);

		/* File log */
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		var file = root + `/logs/info/${date}_${numLog}.log`;
		var fileMessage = `[${time}] ${prefix} ${message}`;
		fs.appendFile(file, fileMessage + '\n', (err) => {
			if(err) { console.log(`${prefix} Error: ` + err); return; }
		});

	}
	/**
	 * Command log
	 *
	 * @param {string} username
	 * @param {string} command
	 * @param {string} message
	 * @memberof Logger
	 */
	command(username:string, command:string, message:string) {

		/* Log data */
		let prefix = `${SPOONGE_PREFIX} [CMD]`;
		let time = dateFormat(new Date(), "HH:MM:ss");

		/* Console log */
		let coloredMessage = `[${time}] ${kleur.magenta(prefix)} ${username}: /${command} ${message}`;
		console.log(coloredMessage);

		/* File log */
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		let file = root + `/logs/command/${date}_${numLog}.log`;
		let fileMessage = `[${time}] ${prefix} ${username}: /${command} ${message}`;
		fs.appendFile(file, fileMessage + '\n', (err) => {
			if(err) { console.log(`${prefix} Error: ` + err); return; }
		});

	}
	/**
	 * Debug log
	 *
	 * @param {string} message
	 * @memberof Logger
	 */
	debug(message:string) {

		/* Log data */
		let prefix = `${SPOONGE_PREFIX} [DEBUG]`;
		let time = dateFormat(new Date(), "HH:MM:ss");

		/* Console log */
		let coloredMessage = `[${time}] ${kleur.cyan(prefix)} ${message}`;
		console.log(coloredMessage);

		/* File log */
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		let file = root + `/logs/debug/${date}_${numLog}.log`;
		let fileMessage = `[${time}] ${prefix} ${message}`;
		fs.appendFile(file, fileMessage + '\n', (err) => {
			if(err) { console.log(`${prefix} Error: ` + err); return; }
		});

	}
	/**
	 * Error log
	 *
	 * @param {*} message
	 * @memberof Logger
	 */
	error(message:any) {

		/* Log data */
		let prefix = `${SPOONGE_PREFIX} [ERROR]`;
		let time = dateFormat(new Date(), "HH:MM:ss");

		/* Console log */
		let coloredMessage = `[${time}] ${kleur.red(prefix)} ${message}`;
		console.log(coloredMessage);

		/* File log */
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		let file = root + `/logs/error/${date}_${numLog}.log`;
		let fileMessage = `[${time}] ${prefix} ${message}`;
		fs.appendFile(file, fileMessage + '\n', (err) => {
			if(err) { console.log(`${prefix} Error: ` + err); return; }
		});

	}
	/**
	 * Warns log
	 *
	 * @param {string} message
	 * @memberof Logger
	 */
	warns(message:string) {

		/* Log data */
		let prefix = `${SPOONGE_PREFIX} [WARN]`;
		let time = dateFormat(new Date(), "HH:MM:ss");

		/* Console log */
		let coloredMessage = `[${time}] ${prefix} ${message}`;
		console.log(coloredMessage);

		/* File log */
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		let file = root + `/logs/warns/${date}_${numLog}.log`;
		let fileMessage = `[${time}] ${prefix} ${message}`;
		fs.appendFile(file, fileMessage + '\n', (err) => {
			if(err) { console.log(`${prefix} Error: ` + err); return; }
		});

	}
	/**
	 * Create folder if not exist
	 *
	 * @param {string} folder
	 * @memberof Logger
	 */
	createFolder(folder:string) {
		fs.mkdir(folder, { recursive: true }, err => {
			if(err) { return; }
		});
	}
	/**
	 * Log number
	 *
	 * @param {string} path
	 * @memberof Logger
	 */
	logNumber(path:string) {
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		fs.readdir(path, function(err, files) {
			let count = 0;
			if(files) {
				files.forEach(file => {
					if(file.includes(date)) {
						count++;
					}
				});
			}
			numLog = count;
		});
	}
	/**
	 *  Create log file
	 *
	 * @memberof Logger
	 */
	createFile(file:any) {
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		var createFile = root + `/logs/${file}/${date}_${numLog}.log`;
		fs.writeFile(createFile, '', (err) => {
			if(err) { return; }
		});
	}
}