const fs = require('fs');
const path = require('path');

function addJsExtensions(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const newContent = content.replace(
        /from ['"](\.[^'"]+)['"];?/g,
        (match, importPath) => {
            if (importPath.endsWith('.js')) return match;
            return `from '${importPath}.js';`;
        }
    );
    fs.writeFileSync(filePath, newContent);
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory() && !file.includes('node_modules')) {
            walkDir(filePath);
        } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
            console.log(`Processing ${filePath}`);
            addJsExtensions(filePath);
        }
    });
}

walkDir(path.join(__dirname, '../src')); 