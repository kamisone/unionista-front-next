import React, { ReactNode, useRef, useState } from "react";
import styles from '@/shared/avatar-slot/AvatarSlot.module.css';

interface AvatarSlotProps {
    content: ReactNode;
}

const AvatarSlot = ({content}: AvatarSlotProps) => {
     const [isSwitchOpened, setIsSwitchOpened] = useState(false);
     const buttonElement = useRef<HTMLButtonElement>(null);
    
     return (
         <button
             ref={buttonElement}
             onBlur={() => {
                 setIsSwitchOpened(false);
             }}
             onFocusCapture={() => {
                 setIsSwitchOpened(true);
             }}
             className={styles.container}
         >
             <div className={styles.current_lng}>
                 {content}
             </div>
             
         </button>
     );
}


export default AvatarSlot;