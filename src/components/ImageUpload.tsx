import React, {ChangeEventHandler, useRef, useState} from 'react';

interface ImageUploadProps {
    name: string,
    onImageChange: ChangeEventHandler<HTMLInputElement>;
    initialImage?: string;
    accept?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, initialImage, name, accept }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(initialImage || null);
    const imgElm = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
            onImageChange(event);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (imgElm.current)
            imgElm.current.value = ''
        const changeEvent = new Event('change', { bubbles: true });
        if (imgElm.current)
            imgElm.current.dispatchEvent(changeEvent)
    };

    return (
        <div className="image-upload-container">
            {imagePreview ? (
                <div className="imagePreview">
                    <img src={imagePreview} alt="Preview" className="image-preview__img" style={{maxWidth: '100%', maxHeight: '150px'}} />
                    <button type="button" onClick={removeImage} className="remove-image-btn">
                        X
                    </button>
                </div>
            ) : (
                <div className="image-placeholder">
                    <span>No image selected</span>
                </div>
            )}

            <input ref={imgElm} type="file" accept={accept} onChange={handleImageChange} name={name} className="image-input" />
        </div>
    );
};

export default ImageUpload;
