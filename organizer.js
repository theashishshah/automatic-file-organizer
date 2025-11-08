import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // get the directory name of the current file

// take target dir from command line arguments
const targetDir = process.argv[2] || __dirname;

const categories = {
    'images': ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'ico', 'webp'],
    'documents': ['doc', 'docx', 'pdf', 'txt', 'rtf', 'odt', 'xls', 'xlsx', 'ppt', 'pptx'],
    'audio': ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac', 'wma', 'aiff', 'au'],
    'videos': ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm', 'm4v', '3gp', '3g2'],
    'archives': ['zip', 'rar', 'tar', 'gz', 'bz2', '7z', 'iso', 'dmg', 'pkg', 'deb', 'rpm'],
    'code': ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'json', 'xml', 'yaml', 'yml', 'ini', 'conf', 'log', 'md', 'txt', 'rtf', 'odt', 'xls', 'xlsx', 'ppt', 'pptx'],
}

const organizer = (folderPath) => { 
    console.log('Organizing files...');
    const fileList = fs.readdirSync(folderPath);

    for (const file of fileList) { 
        const filePath = path.join(folderPath, file);

        const fileStats = fs.statSync(filePath);
        if(fileStats.isDirectory()) { continue; }

        const extension = path.extname(file).slice(1).toLowerCase();
        let categoriesList = Object.keys(categories)
        let category = categoriesList.find(key => categories[key].includes(extension));
        if (!category) category = "other";

        const destinationPath = path.join(folderPath, category);
        if (!fs.existsSync(destinationPath)) fs.mkdirSync(destinationPath, { recursive: true });
        
        const destinationFilePath = path.join(destinationPath, file);

        fs.renameSync(filePath, destinationFilePath);

        console.log(`Moved ${file} to ${destinationPath}`);

    }

}

organizer(targetDir);

