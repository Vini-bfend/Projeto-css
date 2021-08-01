'use strict';

const _ = require('lodash');
const chokidar = require('chokidar');
const upath = require('upath');
const renderAssets = require('./render-assets');
const renderHTML = require('./render-html');
const renderSCSS = require('./render-scss');

const watcher = chokidar.watch('src', {
    persistent: true,
});

let READY = false;

process.title = 'watch';
process.stdout.write('Loading');

watcher.on('add', filePath => _processFile(upath.normalize(filePath), 'add'));
watcher.on('change', filePath => _processFile(upath.normalize(filePath), 'change'));
watcher.on('ready', () => {
    READY = true;
    console.log(' READY TO ROLL!');
});

_handleSCSS();
_handleHTML();

function _processFile(filePath, watchEvent) {

    console.log(`### INFO: File event: ${watchEvent}: ${filePath}`);

    if (filePath.match(/\.html/)) {
        if (watchEvent === 'change') {
            return _handleHTML(filePath, watchEvent);
        }
        return;
    }

    if (filePath.match(/\.scss$/)) {
        if (watchEvent === 'change') {
            return _handleSCSS(filePath, watchEvent);
        }
        return;
    }

    if (filePath.match(/src\/assets\//)) {
        return renderAssets();
    }

}

function _handleHTML(){
    renderHTML();
}

function _handleSCSS() {
    renderSCSS();
}