#!/usr/bin/env node

const fs = require('fs');

const {lstat} = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
    if (err) {
        return console.log(err);
    }

    const statPromises = filenames.map(filename => lstat(filename));

    const allStats = await Promise.all(statPromises);

    for (let i = 0; i < allStats.length; i++) {
        const stat = allStats[i];

        console.log(filenames[i], stat.isFile());
    }
});