const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const config = require('./config.json');

const sourceDir = config.sourceDir;
const outputDir = config.outputDir;

function findGLTFFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findGLTFFiles(filePath, fileList);
    } else if (/(.gltf|.glb)$/.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function convertAndCompressGLTF(inputFile, outputFile) {
  const command = `gltf-pipeline -i "${inputFile}" -o "${outputFile}" --draco.compressionLevel=10`;

  try {
    execSync(command);
    console.log(`Successfully converted and compressed ${inputFile}`);
  } catch (error) {
    console.error(`Error converting ${inputFile}: ${error.message}`);
  }
}

const gltfFiles = findGLTFFiles(sourceDir);

gltfFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  const outputFile = path.join(outputDir, fileName);

  convertAndCompressGLTF(filePath, outputFile);
});
