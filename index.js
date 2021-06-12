#!/usr/bin/env node

const fs = require('fs');

const chalk = require('chalk');

const {lstat} = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
    if (err) {
        return console.log(err);
    }

    const statPromises = filenames.map(filename => lstat(filename));

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