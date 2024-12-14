import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function addJsExtensions(filePath) {
    const content = readFileSync(filePath, 'utf8');
    const newContent = content.replace(
        /from ['"](\.[^'"]+)['"];?/g,
        (match, importPath) => {
            if (importPath.endsWith('.js')) return match;
            return `from '${importPath}.js';`;
        }
    );
    writeFileSync(filePath, newContent);
}

function walkDir(dir) {
    const files = readdirSync(dir);
    files.forEach(file => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);
        if (stat.isDirectory() && !file.includes('node_modules') && !file.includes('dist')) {
            walkDir(filePath);
        } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
            console.log(`Processing ${filePath}`);
            addJsExtensions(filePath);
        }
    });
}

walkDir(join(__dirname, '../src')); 