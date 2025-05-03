import React, { useState } from 'react';

function FileUploader() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            alert('Please choose a file to upload.');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://www.dbooks.org/api/search/python', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); 
            alert('Upload successful!');

            
            setFile(null);
        } catch (error) {
            alert('Error during upload: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
            />
            <button
                onClick={handleUpload}
                disabled={isUploading}
            >
                {isUploading ? 'Uploading...' : 'Upload File'}
            </button>
        </div>
    );
}

export default FileUploader;
