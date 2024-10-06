'use client';

import { LoaderService } from '@/services/browser/loader.service';
import { ModalService } from '@/services/browser/modal.service';
import { RouterService } from '@/services/browser/router.service';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useTransition } from 'react';

const routerService = RouterService.instance;
const loaderService = LoaderService.instance;
ModalService.instance;

export default function ExternalRouter() {
    const router = useRouter();
    const isInitialMount = useRef(true);
    const instanceId = useId();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        routerService.addNotifier((options) => {
            startTransition(() => {
                if (!options || !options.state.url) return;
                router.push(options.state.url);
                routerService.state.url = null; // --> change state without rerendering
            });
        });
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (
                isPending &&
                !loaderService.state.isLoadingIds.includes(instanceId)
            ) {
                loaderService.state = {
                    isLoadingIds: [
                        ...loaderService.state.isLoadingIds,
                        instanceId,
                    ],
                };
            } else if (loaderService.state.isLoadingIds.includes(instanceId)) {
                loaderService.state = {
                    isLoadingIds: loaderService.state.isLoadingIds.filter(
                        (id) => id !== instanceId
                    ),
                };
            }
        }
    }, [isPending]);

    return <></>;
}
