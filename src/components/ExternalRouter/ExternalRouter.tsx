'use client';

import { ModalService } from '@/services/modal.service';
import { RouterService } from '@/services/router.service';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const routerService = RouterService.instance;
ModalService.instance;

export default function ExternalRouter() {
    const router = useRouter();

    useEffect(() => {
        routerService.addNotifier((options) => {
            if (!options || !options.state.url) return;
            router.push(options.state.url);
            routerService.state.url = null; // --> change state without rerendering
        });
    }, []);

    return <></>;
}
