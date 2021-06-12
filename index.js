#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const chalk = require('chalk');

const {lstat} = fs.promises;
const targetDir = process.argv[2] ? process.argv[2] : process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        return console.log(err);
    }

    const statPromises = filenames.map(filename => lstat(path.join(targetDir, filename)));

    const allStats = await Promise.all(statPromises);

    for (let i = 0; i < allStats.length; i++) {
        const stats = allStats[i];

        if (stats.isFile()) {
            console.log(filenames[i]);
        } else {
            console.log(chalk.bold(filenames[i]));
        }
    }
});