'use client';

import { i18nTranslation } from '@/i18n';
import { SupportedLanguages } from '@/i18n/settings';
import BottomArrowIcon from '@/icons/bottom-arrow-icon/BottomArrowIcon';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import FieldsetControl from '../fieldset-control/FieldsetControl';

interface FieldsetSelectInputProps {
    lng: SupportedLanguages;
    name: string;
    label: string;
    options: { key: string; value: string }[];
    isRequired?: boolean;
    utilities?: string;
}

function FieldsetSelectInput(props: FieldsetSelectInputProps) {
    const { name, label, options, lng, isRequired, utilities } = props;

    const [selectedIdx, setSelectedIdx] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFocused, setIsFocused] = useState(true);
    const nativeSelectRef = useRef<HTMLSelectElement | null>(null);
    const t = i18nTranslation(lng, 'sheared');

    useEffect(() => {
        setIsFocused(false);
        if (nativeSelectRef.current) nativeSelectRef.current.value = '';
    }, []);

    return (
        <>
            <FieldsetControl
                label={`${label}${isRequired ? '*' : ''}`}
                labelId={name}
                forceFocus={!!isFocused}
                utilities={utilities}
            >
                <select name={name} hidden ref={nativeSelectRef}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value} />
                    ))}
                </select>
                <button
                    id={name}
                    type="button"
                    className="relative outline-none bg-transparent h-full w-full cursor-pointer"
                    role="listbox"
                    aria-haspopup="listbox"
                    aria-expanded={isExpanded}
                    onClick={() => {
                        setIsExpanded((value) => {
                            if (value) {
                                if (nativeSelectRef.current) {
                                    nativeSelectRef.current.value = selectedIdx
                                        ? options[selectedIdx - 1].value
                                        : '';
                                }
                            }
                            return !value;
                        });
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        isExpanded && setIsExpanded(false);
                        !selectedIdx && setIsFocused(false);
                    }}
                    onKeyDown={(e) => {
                        switch (e.key) {
                            case 'ArrowDown':
                                setSelectedIdx((idx) => {
                                    const newIdx =
                                        idx < options.length
                                            ? idx + 1
                                            : options.length;

                                    return newIdx;
                                });

                                break;
                            case 'ArrowUp':
                                setSelectedIdx((idx) => (idx ? idx - 1 : 0));
                                break;
                            case 'Escape': {
                                setIsExpanded(false);
                            }
                        }
                    }}
                >
                    <div
                        aria-label={t('select-input.default')}
                        role="button"
                        aria-live="polite"
                        className="h-full flex items-center justify-between px-2"
                    >
                        <span>
                            {selectedIdx
                                ? options[selectedIdx - 1].key
                                : isFocused && t('select-input.default')}
                        </span>
                        <div
                            className={clsx(
                                {
                                    'text-sky-blue': isFocused || isExpanded,
                                    'text-neutral-grey':
                                        !isFocused && !isExpanded,
                                },
                                'transition-all'
                            )}
                            style={{
                                ...(isExpanded
                                    ? {
                                          transformOrigin: '50% 50% 0',
                                          transform: 'rotateZ(180deg)',
                                      }
                                    : {}),
                            }}
                        >
                            <BottomArrowIcon />
                        </div>
                    </div>
                    {isExpanded && (
                        <div
                            className="absolute w-full left-0 top-[108%] text-start bg-white outline-2 outline-sky-blue outline shadow-lg rounded-sm animate-[fadeInTop_0.5s_forwards]"
                            role="listbox"
                            aria-label="listbox"
                        >
                            {!isRequired && (
                                <div
                                    key={t('select-input.default')}
                                    role="option"
                                    aria-selected={0 === selectedIdx}
                                    data-value=""
                                    onClick={() => {
                                        if (nativeSelectRef.current) {
                                            nativeSelectRef.current.value = '';
                                            setSelectedIdx(0);
                                        }
                                    }}
                                    className={clsx(
                                        'hover:bg-[#d4571a] p-2 first-letter:uppercase',
                                        {
                                            'bg-primary': 0 === selectedIdx,
                                        }
                                    )}
                                >
                                    {t('select-input.default')}
                                </div>
                            )}
                            {options.map((option, idx) => (
                                <div
                                    key={option.value}
                                    className={clsx('hover:bg-[#d4571a] p-2', {
                                        'bg-primary': idx + 1 === selectedIdx,
                                    })}
                                    role="option"
                                    aria-selected={idx + 1 === selectedIdx}
                                    data-value={option.value}
                                    onClick={(e) => {
                                        if (nativeSelectRef.current) {
                                            nativeSelectRef.current.value =
                                                option.value;
                                            setSelectedIdx(idx + 1);
                                        }
                                    }}
                                >
                                    {option.key}
                                </div>
                            ))}
                        </div>
                    )}
                </button>
            </FieldsetControl>
        </>
    );
}

export default FieldsetSelectInput;
