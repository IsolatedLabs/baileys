import { normalizeMessageContent } from './messages';

export const getTypeMessage = (msg: any): 'reaction' | 'media' | 'text' => {
    const message = normalizeMessageContent(msg);
    if (message.reactionMessage) {
        return 'reaction';
    }
    if (getMediaType(message)) {
        return 'media';
    }
    return 'text';
};

export const getMediaType = (message: any): string | undefined => {
    if (message.imageMessage) {
        return 'image';
    }
    if (message.videoMessage) {
        return message.videoMessage.gifPlayback ? 'gif' : 'video';
    }
    if (message.audioMessage) {
        return message.audioMessage.ptt ? 'ptt' : 'audio';
    }
    if (message.contactMessage) {
        return 'vcard';
    }
    if (message.documentMessage) {
        return 'document';
    }
    if (message.contactsArrayMessage) {
        return 'contact_array';
    }
    if (message.liveLocationMessage) {
        return 'livelocation';
    }
    if (message.stickerMessage) {
        return 'sticker';
    }
    if (message.listMessage) {
        return 'list';
    }
    if (message.listResponseMessage) {
        return 'list_response';
    }
    if (message.buttonsResponseMessage) {
        return 'buttons_response';
    }
    if (message.orderMessage) {
        return 'order';
    }
    if (message.productMessage) {
        return 'product';
    }
    if (message.interactiveResponseMessage) {
        return 'native_flow_response';
    }
    if (message.groupInviteMessage) {
        return 'url';
    }
    if (/https:\/\/wa\.me\/p\/\d+\/\d+/.test(message.extendedTextMessage?.text)) {
        return 'productlink';
    }
    return undefined;
};

export const getButtonType = (message: any): string | undefined => {
    if (message.listMessage) {
        return 'list';
    }
    if (message.buttonsMessage) {
        return 'buttons';
    }
    if (message.interactiveMessage?.nativeFlowMessage?.buttons?.[0]?.name === 'review_and_pay') {
        return 'review_and_pay';
    }
    if (message.interactiveMessage?.nativeFlowMessage?.buttons?.[0]?.name === 'review_order') {
        return 'review_order';
    }
    if (message.interactiveMessage?.nativeFlowMessage?.buttons?.[0]?.name === 'payment_info') {
        return 'payment_info';
    }
    if (message.interactiveMessage?.nativeFlowMessage?.buttons?.[0]?.name === 'payment_status') {
        return 'payment_status';
    }
    if (message.interactiveMessage?.nativeFlowMessage?.buttons?.[0]?.name === 'payment_method') {
        return 'payment_method';
    }
    if (message.interactiveMessage && message.interactiveMessage?.nativeFlowMessage) {
        return 'interactive';
    }
    if (message.interactiveMessage?.nativeFlowMessage) {
        return 'native_flow';
    }
    return undefined;
};
