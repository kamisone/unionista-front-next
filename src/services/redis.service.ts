// import { ModalState } from './modal.service';
// import { MODAL_STATE_KEYS } from '@/redis/keys-mapping';

// export default class RedisService {
//     private static _instance: RedisService | null = null;

//     static get instance() {
//         if (!this._instance) {
//             this._instance = new RedisService();
//         }
//         return this._instance;
//     }

//     async setModalState({ isModalOpen, currentModalContent }: ModalState) {
//         // const [prevIsModalOpen, prevCurrentModalContent] = await Promise.all([
//         //     redisClient.get(MODAL_STATE_KEYS.IS_MODAL_OPEN),
//         //     redisClient.get(MODAL_STATE_KEYS.CURRENT_MODAL_CONTENT),
//         // ]);
//         if (isModalOpen !== undefined) {
//             await redisClient.set(
//                 MODAL_STATE_KEYS.IS_MODAL_OPEN,
//                 JSON.stringify(isModalOpen)
//             );
//         }
//         if (currentModalContent !== undefined) {
//             await redisClient.set(
//                 MODAL_STATE_KEYS.CURRENT_MODAL_CONTENT,
//                 JSON.stringify(currentModalContent)
//             );
//         }
//         return {
//             isModalOpen,
//             currentModalContent,
//         };
//     }

//     async getModalState() {
//         return {
//             isModalOpen: JSON.parse(
//                 (await redisClient.get(MODAL_STATE_KEYS.IS_MODAL_OPEN)) ??
//                     `null`
//             ),
//             currentModalContent: JSON.parse(
//                 (await redisClient.get(
//                     MODAL_STATE_KEYS.CURRENT_MODAL_CONTENT
//                 )) ?? `null`
//             ),
//         } as ModalState;
//     }
// }
