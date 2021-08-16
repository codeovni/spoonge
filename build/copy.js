const ncp = require('ncp');

let languages = {
    src: "./src/langs",
    dest: "./app/langs"
}

ncp(languages.src, languages.dest, function (err) {
    if(err) { return console.error(err); }
    console.log("[Spoonge] Languages copied correctly!");
});