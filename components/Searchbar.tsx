
import React, { useState } from 'react';

interface ImageUploaderProps {
    onImageUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setPreview(imageUrl);
                onImageUpload(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            {preview && <img src={preview} alt="Preview" />}
            <input type="file" onChange={handleImageChange} />
        </div>
    );
};

export default ImageUploader;
