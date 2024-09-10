// import { useEffect, useRef, useState } from 'react';
// import {
//     ReadonlyURLSearchParams,
//     usePathname,
//     useRouter,
//     useSearchParams,
// } from 'next/navigation';
// import { FrontQueryParams } from '@/utils/query-params';
// import { ModalService } from '@/services/modal.service';
// import { ModalContentMapping } from '@/utils/modal';

// const modalService = ModalService.instance;

// const useUpdatePathQuery = () => {
//     const [modalContent, setModalContent] = useState(
//         modalService.state.currentModalContent
//     );
//     const isInitialMount = useRef(true);
//     const router = useRouter();
//     const pathname = usePathname();
//     const searchParams = useSearchParams();

//     // set notifiers
//     useEffect(() => {
//         modalService.addNotifier((options) => {
//             options && setModalContent(options.state.currentModalContent);
//         });
//     }, []);

//     useEffect(() => {
//         const searchParamsUrl = new URLSearchParams(
//             Array.from(searchParams.entries())
//         );
//         if (isInitialMount.current) {
//             isInitialMount.current = false;
//             if (searchParamsUrl.has(FrontQueryParams.MODAL_CONTENT)) {
//                 modalService.state = {
//                     isModalOpen: true,
//                     currentModalContent: searchParams.get(
//                         FrontQueryParams.MODAL_CONTENT
//                     ) as ModalContentMapping,
//                 };
//             }
//         } else {
//             if (modalContent) {
//                 router.replace(
//                     `${pathname}?${addQueryParamToUrl(
//                         searchParams,
//                         FrontQueryParams.MODAL_CONTENT,
//                         modalContent
//                     )}`
//                 );
//             } else {
//                 router.replace(
//                     `${pathname}?${stripQueryParamFromUrl(
//                         searchParams,
//                         FrontQueryParams.MODAL_CONTENT
//                     )}`
//                 );
//             }
//         }
//     }, [modalContent]);

//     function stripQueryParamFromUrl(
//         searchParams: ReadonlyURLSearchParams,
//         paramKey: FrontQueryParams
//     ) {
//         const nativeUrlSearchParams = new URLSearchParams(
//             Array.from(searchParams.entries())
//         );
//         nativeUrlSearchParams.delete(paramKey);
//         return nativeUrlSearchParams;
//     }

//     function addQueryParamToUrl(
//         searchParams: ReadonlyURLSearchParams,
//         paramKey: FrontQueryParams,
//         paramValue: string
//     ) {
//         const nativeUrlSearchParams = new URLSearchParams(
//             Array.from(searchParams.entries())
//         );
//         if (nativeUrlSearchParams.has(paramKey)) {
//             nativeUrlSearchParams.set(paramKey, paramValue);
//         } else {
//             nativeUrlSearchParams.append(paramKey, paramValue);
//         }

//         return nativeUrlSearchParams;
//     }
// };

// export { useUpdatePathQuery };
