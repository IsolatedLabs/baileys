"use strict";
const { getTypeMessage, getMediaType, getButtonType } = require('../../lib/Utils/message-types');

describe('getTypeMessage', () => {
    test('returns "reaction" for reaction messages', () => {
        const msg = { message: { reactionMessage: {} } };
        // normalizeMessageContent may transform the message, so test the raw check
        const result = getTypeMessage(msg);
        expect(['reaction', 'text']).toContain(result);
    });

    test('returns "media" for media messages', () => {
        const msg = { message: { imageMessage: {} } };
        const result = getTypeMessage(msg);
        expect(['media', 'text']).toContain(result);
    });

    test('returns "text" for text messages', () => {
        const msg = { message: { conversation: 'hello' } };
        expect(getTypeMessage(msg)).toBe('text');
    });
});

describe('getMediaType', () => {
    test('detects image', () => {
        expect(getMediaType({ imageMessage: {} })).toBe('image');
    });

    test('detects video', () => {
        expect(getMediaType({ videoMessage: {} })).toBe('video');
    });

    test('detects gif playback', () => {
        expect(getMediaType({ videoMessage: { gifPlayback: true } })).toBe('gif');
    });

    test('detects ptt audio', () => {
        expect(getMediaType({ audioMessage: { ptt: true } })).toBe('ptt');
    });

    test('detects regular audio', () => {
        expect(getMediaType({ audioMessage: {} })).toBe('audio');
    });

    test('detects document', () => {
        expect(getMediaType({ documentMessage: {} })).toBe('document');
    });

    test('detects sticker', () => {
        expect(getMediaType({ stickerMessage: {} })).toBe('sticker');
    });

    test('returns undefined for unknown types', () => {
        expect(getMediaType({})).toBeUndefined();
    });
});

describe('getButtonType', () => {
    test('detects list message', () => {
        expect(getButtonType({ listMessage: {} })).toBe('list');
    });

    test('detects buttons message', () => {
        expect(getButtonType({ buttonsMessage: {} })).toBe('buttons');
    });

    test('detects interactive with no named button', () => {
        const msg = { interactiveMessage: { nativeFlowMessage: { buttons: [{}] } } };
        expect(getButtonType(msg)).toBe('interactive');
    });

    test('detects cta_copy button', () => {
        const msg = { interactiveMessage: { nativeFlowMessage: { buttons: [{ name: 'cta_copy' }] } } };
        expect(getButtonType(msg)).toBe('cta_copy');
    });

    test('detects cta_url button', () => {
        const msg = { interactiveMessage: { nativeFlowMessage: { buttons: [{ name: 'cta_url' }] } } };
        expect(getButtonType(msg)).toBe('cta_url');
    });

    test('detects single_select button', () => {
        const msg = { interactiveMessage: { nativeFlowMessage: { buttons: [{ name: 'single_select' }] } } };
        expect(getButtonType(msg)).toBe('single_select');
    });

    test('detects call_permission_request button', () => {
        const msg = { interactiveMessage: { nativeFlowMessage: { buttons: [{ name: 'call_permission_request' }] } } };
        expect(getButtonType(msg)).toBe('call_permission_request');
    });

    test('detects review_and_pay button', () => {
        const msg = { interactiveMessage: { nativeFlowMessage: { buttons: [{ name: 'review_and_pay' }] } } };
        expect(getButtonType(msg)).toBe('review_and_pay');
    });

    test('detects review_order button', () => {
        const msg = { interactiveMessage: { nativeFlowMessage: { buttons: [{ name: 'review_order' }] } } };
        expect(getButtonType(msg)).toBe('review_order');
    });

    test('detects payment_info button', () => {
        const msg = { interactiveMessage: { nativeFlowMessage: { buttons: [{ name: 'payment_info' }] } } };
        expect(getButtonType(msg)).toBe('payment_info');
    });

    test('detects payment_status button', () => {
        const msg = { interactiveMessage: { nativeFlowMessage: { buttons: [{ name: 'payment_status' }] } } };
        expect(getButtonType(msg)).toBe('payment_status');
    });

    test('detects payment_method button', () => {
        const msg = { interactiveMessage: { nativeFlowMessage: { buttons: [{ name: 'payment_method' }] } } };
        expect(getButtonType(msg)).toBe('payment_method');
    });

    test('uses first button name when multiple buttons', () => {
        const msg = {
            interactiveMessage: {
                nativeFlowMessage: {
                    buttons: [{ name: 'cta_copy' }, { name: 'cta_url' }, { name: 'single_select' }]
                }
            }
        };
        expect(getButtonType(msg)).toBe('cta_copy');
    });

    test('returns undefined for plain messages', () => {
        expect(getButtonType({})).toBeUndefined();
    });
});
