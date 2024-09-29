import styles from '@/shared/fieldset-control/FieldsetControl.module.css';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface FieldsetControlProps {
    children: ReactNode[] | ReactNode | string;
    label: string;
    labelId: string;
    forceFocus: boolean;
    utilities?: string;
}

export default function FieldsetControl({
    children,
    label,
    labelId,
    forceFocus,
    utilities,
}: FieldsetControlProps) {
    return (
        <fieldset
            className={clsx(
                styles.container,
                `relative isolate rounded-[3px] h-9
                outline-none
                  focus-within:border-sky-blue 
                focus-within:shadow-sm focus-within:shadow-sky-blue`,
                utilities,
                {
                    [styles['force-focus']]: forceFocus,
                }
            )}
        >
            <legend
                className={clsx(
                    'mx-1 text-neutral-grey absolute top-0 leading-[0]'
                )}
            >
                <label htmlFor={labelId} className="px-1 capitalize">
                    {label}
                </label>
            </legend>
            {children}
        </fieldset>
    );
}
