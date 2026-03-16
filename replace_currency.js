const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk('c:/Users/USER/Downloads/yfeey-ecommerce/src');

files.forEach((file) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    if (data.includes('€')) {
      const result = data.replace(/€/g, '£');
      fs.writeFileSync(file, result, 'utf8');
      console.log(`Updated: ${file}`);
    }
  } catch (err) {
    console.error(`Error processing ${file}: ${err}`);
  }
});
