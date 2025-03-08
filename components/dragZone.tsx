import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { uploadFiles } from '@/utils/uploadFiles';

interface DropzoneStates {
    imageUrl: string | null;
    isUploading: boolean;
    displayName: string;
}

interface DropzoneUploaderProps {
    dropZoneStates: DropzoneStates;
    setDropZoneStates: Dispatch<SetStateAction<DropzoneStates>>;
}

export default function DropzoneUploader({ dropZoneStates, setDropZoneStates }: DropzoneUploaderProps) {

    const { isUploading } = dropZoneStates

    const [file, setFile] = useState<File[] | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles);
    }, []);


    useEffect(() => {
        (async () => {
            if (!file || isUploading) return;

            try {
                setDropZoneStates(prevState => ({
                    ...prevState,
                    isUploading: true,
                }));
                const resultUrl = await uploadFiles(file);

                if (resultUrl) {
                    setDropZoneStates(prevState => ({
                        ...prevState,
                        imageUrl: resultUrl.url,
                        displayName: resultUrl.image_name
                    }));
                }
            } catch (error) {
                console.error("Upload failed:", error);
            } finally {
                setDropZoneStates(prevState => ({
                    ...prevState,
                    isUploading: false
                }));
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        open
    } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpg', '.png', '.gif']
        },
        maxSize: 2 * 1024 * 1024, // 2MB max file size
        noClick: true,
        maxFiles: 1,
        noKeyboard: true
    });

    return (
        <div className='bg-customBackground rounded-xl p-2 min-w-150 min-h-100 shadow-xl'>
            <div
                {...getRootProps()}
                className={`
        p-8 border-1 border-dashed rounded-lg text-center min-h-105 flex items-center justify-center flex-col
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
      `}
            >
                <input {...getInputProps()} />
                <Image className='mb-6' src="/exit.svg" alt="icon-download" width={30} height={30} />
                <div className="text-customColorFont text-sm font-thin">
                    {isDragActive
                        ? 'Drop the files here ...'
                        :
                        <>
                            <p className='font-thin mb-2 text-customColorFont'><strong className='text-customColorFont'>Drag & drop a file or <button className='text-blue-600 cursor-pointer bg-transparent!' onClick={open}>browse files</button></strong></p>

                            <p className='text-gray-400'> JPG,PNG or GIF -Max file size 2MB</p>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}