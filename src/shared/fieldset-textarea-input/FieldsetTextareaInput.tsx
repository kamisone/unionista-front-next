'use client';

import { SupportedLanguages } from '@/i18n/settings';
import { useEffect, useRef, useState } from 'react';
import FieldsetControl from '../fieldset-control/FieldsetControl';
import clsx from 'clsx';

interface FieldsetTextareaInputProps {
    lng: SupportedLanguages;
    name: string;
    label: string;
    isRequired?: boolean;
    utilities?: string;
}

function FieldsetTextareaInput(props: FieldsetTextareaInputProps) {
    const { name, label, isRequired, utilities } = props;

    const [isEmpty, setIsEmpty] = useState(false);
    const inputEl = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (inputEl.current) {
            !inputEl.current.value && setIsEmpty(true);
        }
    }, []);

    return (
        <>
            <FieldsetControl
                label={`${label}${isRequired ? '*' : ''}`}
                labelId={name}
                forceFocus={!isEmpty}
                utilities={clsx('!h-16', utilities)}
            >
                <textarea
                    className="border-none absolute px-2 mt-2 outline-none bg-transparent h-[calc(100%-0.5rem)] w-full border-4 border-black resize-none"
                    id={name}
                    name={props.name}
                    ref={inputEl}
                    onInput={(e) =>
                        setIsEmpty(!(e.target as HTMLInputElement).value)
                    }
                />
            </FieldsetControl>
        </>
    );
}

export default FieldsetTextareaInput;
