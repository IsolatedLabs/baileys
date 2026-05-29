"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getButtonType = exports.getMediaType = exports.getTypeMessage = void 0;
const messages_1 = require("./messages");

const getTypeMessage = (msg) => {
    const message = messages_1.normalizeMessageContent(msg);
    if (message.reactionMessage) {
        return 'reaction';
    }
    if (getMediaType(message)) {
        return 'media';
    }
    return 'text';
};
exports.getTypeMessage = getTypeMessage;

const getMediaType = (message) => {
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
exports.getMediaType = getMediaType;

const BUTTON_TYPE_ORDER = ['review_and_pay', 'review_order', 'payment_info', 'payment_status', 'payment_method'];
const BUTTON_TYPE_FLOW = ['cta_copy', 'cta_url', 'single_select', 'call_permission_request', 'cta_catalog', 'mpm'];

const getButtonType = (message) => {
    if (message.listMessage) {
        return 'list';
    }
    if (message.buttonsMessage) {
        return 'buttons';
    }

    const firstButtonName = message.interactiveMessage?.nativeFlowMessage?.buttons?.[0]?.name;
    if (firstButtonName) {
        if (BUTTON_TYPE_ORDER.includes(firstButtonName)) {
            return firstButtonName;
        }
        if (BUTTON_TYPE_FLOW.includes(firstButtonName)) {
            return firstButtonName;
        }
    }

    if (message.interactiveMessage?.nativeFlowMessage) {
        return 'interactive';
    }
    return undefined;
};
exports.getButtonType = getButtonType;
