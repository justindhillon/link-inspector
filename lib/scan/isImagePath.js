function isImagePath(filePath) {
    // Define an array of image file extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];

    // Extract the file extension from the file path
    const fileExtension = filePath.slice(((filePath.lastIndexOf(".") - 1) >>> 0) + 2);

    // Check if the file extension is in the array of image extensions
    return imageExtensions.includes('.' + fileExtension.toLowerCase());
}

module.exports = isImagePath;
