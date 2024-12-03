"use client";

import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void;
  existingImages?: string[];
}

export function ImageUpload({ onImagesUploaded, existingImages = [] }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(existingImages);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.url;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: true,
    onDrop: async (acceptedFiles) => {
      setIsUploading(true);
      try {
        const uploadPromises = acceptedFiles.map(file => uploadImage(file));
        const urls = await Promise.all(uploadPromises);
        const newImages = [...images, ...urls];
        setImages(newImages);
        onImagesUploaded(newImages);
      } catch (error) {
        console.error('Error uploading images:', error);
      } finally {
        setIsUploading(false);
      }
    }
  });

  const removeImage = (indexToRemove: number) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    setImages(newImages);
    onImagesUploaded(newImages);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-muted-foreground">
          {isUploading ? 'Téléchargement en cours...' : 'Glissez-déposez des images ici, ou cliquez pour sélectionner des fichiers'}
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={url}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}