export function getTypeMessage(msg: any): 'reaction' | 'media' | 'text';
export function getMediaType(message: any): string | undefined;
export function getButtonType(message: any): string | undefined;
