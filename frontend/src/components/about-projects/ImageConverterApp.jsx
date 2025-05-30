import React, { useState } from 'react'

const ImageConverterApp = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [convertedImage, setConvertedImage] = useState(null);
    const [imgFormat, setImgFormat] = useState('jpeg');

    const handleImageUploadChange = (e) => {
        const file = e.target.files[0];
        if(!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setOriginalImage(reader.result);
            setConvertedImage(null);
        }

        reader.readAsDataURL(file);
    }

    const handleConvertImage = () => {
        const img = new Image();
        img.src = originalImage;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const imgContext = canvas.getContext('2d');
            imgContext.drawImage(img, 0, 0);

            const newImage = canvas.toDataURL(`image/${imgFormat}`);
            setConvertedImage(newImage);
        }
    }

    const handleDownloadImage = () => {
        const imgLink = document.createElement('a');
        imgLink.href = convertedImage;
        imgLink.download = `converted-image.${imgFormat}`;
        imgLink.click();
    }

    return (
        <div style={{ 
                background: 'linear-gradient(180deg,rgba(222, 235, 241, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                padding: '16px'
            }}>
            <h5 style={{ color: '#1A282F', margin: '0px' }}>Image Converter App</h5>
            <div style={{ margin: '16px', display: 'flex', justifyContent: 'center',  }}>
                <input type='file' accept='image/*' onChange={handleImageUploadChange} />
            </div>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', color: '#0b374d' }}>Select Format: </label>
                <select value={imgFormat} onChange={(e) => setImgFormat(e.target.value)}>
                    <option value='jpeg'>JPEG</option>
                    <option value='png'>PNG</option>
                    <option value='webp'>WEBP</option>
                </select>
            </div>
            <div>
                {originalImage && (
                    <button 
                        onClick={handleConvertImage} 
                        style={{ border: '2px solid #1A282F', color: '#1A282F', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer' }}>
                        Convert
                    </button>
                )}
            </div>

            {convertedImage && (
                <div>
                    <h5>Converted Image Preview:</h5>
                    <img 
                        src={convertedImage} 
                        alt='converted' 
                        style={{ maxWidth: '100%', height: 'auto' }} />
                    <br />
                    <button onClick={handleDownloadImage} 
                        style={{ 
                                margin: '8px',
                                border: '2px solid #1A282F',
                                borderRadius: '6px',
                                padding: '5px 8px',
                                cursor: 'pointer',
                                color: '#1A282F' 
                            }}>
                        Download
                    </button>
                </div>
            )}
        </div>
    )
}

export default ImageConverterApp