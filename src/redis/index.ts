// import 'server-only';
// import { createClient } from 'redis';
// import logger from '@/logger';

// const client = createClient({
//     url: process.env.REDIS_URL
// });

// client.on('connect', () => logger.info('Redis client connected'));
// client.on('ready', () => logger.info('Redis client redy'));
// client.on('end', () => logger.info('Redis client closed'));
// client.on('reconnecting', () => logger.warn('Redis client reconnecting...'));
// client.on('error', (err) =>
//     logger.error('Redis error: ' + err.message, err.stack)
// );

// client.connect();

// export default client;
