import fs from 'fs';
import path from 'path';

exports.setupAdapters = (adapter) => {
  const requests = path.resolve(__dirname, 'fixtures');

  const mockConfig = fs.readdirSync(requests)
    .forEach((file) => {
      if (/\.mock\.js$/.test(file)) {
        const fileWithPath = path.resolve(requests, file);
        const entry = require(fileWithPath).default;
        entry(adapter);
      }
    });
};