import React from 'react';

function FileDownloader() {
    const downloadFile = async () => {
        try {
            const res = await fetch('https://www.dbooks.org/api/search/python');
            
           
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            
           
            const data = await res.json();
            const fileContent = JSON.stringify(data, null, 2); 
            const blob = new Blob([fileContent], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'report.json'; 
            document.body.appendChild(a); 
            a.click();
            a.remove();

            
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download file:', error);
        }
    };

    return (
        <div>
            <button onClick={downloadFile}>Download Report</button>
        </div>
    );
}

export default FileDownloader;