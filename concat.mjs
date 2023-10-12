import concat from 'concat-files';
import minimist from 'minimist';
const configuration = minimist(process.argv.slice(2)).configuration;
const path = (configuration == 'development') ? 'src/assets/chatbot.js' : 'dist/fuse/chatbot.js';
console.log(path)
concat([
    'dist/chatbot/runtime.js',
    'dist/chatbot/polyfills.js',
    'dist/chatbot/main.js',
    'embed.js',
], path, function (err) {
    if (err) throw err
});
