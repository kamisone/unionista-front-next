import React, { ReactNode, useEffect } from 'react';
import InputControl from '../input-control/InputControl';
import { SupportedLanguages, SupportedLanguagesEnum } from '@/i18n/settings';
import clsx from 'clsx';
import styles from '@/shared/file-uploader/FileUploader.module.css';
import Image from 'next/image';

interface FileUploaderProps {
    lng: SupportedLanguages;
    variant: 'avatar' | 'default';
    isError?: boolean;
    fileInputId?: string;
    uploadedFile: File | null;
}

const FileUploader = ({
    lng,
    variant,
    isError,
    uploadedFile,
    fileInputId,
}: FileUploaderProps) => {


    switch (variant) {
        case 'avatar':
            return (
                <InputControl border="dotted" lng={lng}>
                    <label className={styles.avatar_label}>
                        <div className={styles.avatar_picture_container}>
                            {uploadedFile ? (
                                <img
                                    src={URL.createObjectURL(uploadedFile)}
                                    alt="avatar"
                                />
                            ) : (
                                <img
                                    src="/assets/icons/avatar_profile.png"
                                    alt="avatar placeholder"
                                />
                            )}
                        </div>
                        <span className={styles.avatar_name}>
                            {uploadedFile?.name}
                        </span>
                        <input
                            id={fileInputId}
                            type="file"
                            className={clsx(
                                styles.file_control,
                                'visually-hidden',
                                { [styles.error]: isError }
                            )}
                        />
                    </label>
                </InputControl>
            );
    }
};

export default FileUploader;
