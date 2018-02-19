#!/usr/bin/env node
const program = require('commander');
const { chapters, read, info } = require('./app.js');

program
    .version('1.0.0')
    .command('chapters')
    .alias('c')
    .description('Lists all chapters of the Holy Quran')
    .action(chapters);

program
    .command('info <chapter>')
    .alias('i')
    .description('Gets chapter information')
    .action((chapter) => {
        info(chapter);
    });

program
    .command('read <chapter> [verse] [arabic]')
    .alias('r')
    .description('Lists details about provided chapter and verse')
    .action((chapter, verse, arabic) => {
        read(chapter, verse, arabic);
    });

program.parse(process.argv);