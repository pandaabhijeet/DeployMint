import fs from "fs"
import path from "path"

export const getAllFiles  = (folderPath : string) => {

    let allFiles : string[] = [] ;

    const allFilesAndFolders = fs.readdirSync(folderPath);

    allFilesAndFolders.forEach((file) => {
        const fullFilePath = path.join(folderPath,file);

        if(fs.statSync(fullFilePath).isDirectory()){
            allFiles = allFiles.concat(getAllFiles(fullFilePath));
        }else{
            allFiles.push(fullFilePath);
        }
    })

    return allFiles;
}