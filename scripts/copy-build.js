/**
 * copy the build folder to a new destination
 *
 */
const fs = require('fs-extra');
const path = require('path');

const SRC = path.resolve(__dirname, '../build/');
const DEST = 'E:/projects/server/htdocs/pyramid/';

fs.copy(SRC, DEST)
  .then(() => console.log('Files copied to ' + DEST + '::: Success!'))
  .catch(err => console.error(err));
