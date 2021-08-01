'use strict';
const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');

module.exports = function renderHTML() {
    
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/index.html');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/');

    // const destPathDirname = upath.dirname(destPath);
    // if (!sh.test('-e', destPathDirname)) {
        // sh.mkdir('-p', destPathDirname);
    // }
    
    sh.cp('-r', sourcePath, destPath)
};