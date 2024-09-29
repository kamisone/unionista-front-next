'use client';

import { SupportedLanguages } from '@/i18n/settings';
import { useEffect, useRef, useState } from 'react';
import FieldsetControl from '../fieldset-control/FieldsetControl';

interface FieldsetTextInputProps {
    lng: SupportedLanguages;
    name: string;
    label: string;
    type?: 'text' | 'password';
    isRequired?: boolean;
    utilities?: string
}

function FieldsetTextInput(props: FieldsetTextInputProps) {
    const { type = 'text', name, label, isRequired, utilities } = props;

    const [isEmpty, setIsEmpty] = useState(false);
    const inputEl = useRef<HTMLInputElement | null>(null);

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
                utilities={utilities}
            >
                <input
                    className="border-none absolute px-2 outline-none bg-transparent h-full w-full"
                    id={name}
                    type={type}
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

export default FieldsetTextInput;
