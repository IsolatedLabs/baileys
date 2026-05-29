import { DEFAULT_CONNECTION_CONFIG } from '../Defaults';
import { makeRegistrationSocket } from './registration';
import type { UserFacingSocketConfig } from '../Types';

const makeWASocket = (config: UserFacingSocketConfig) => (
    makeRegistrationSocket({
        ...DEFAULT_CONNECTION_CONFIG,
        ...config,
    })
);

export default makeWASocket;
export { makeWASocket };
