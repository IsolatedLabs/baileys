"use strict";
const { getContentType, extractUrlFromText } = require('../../lib/Utils/messages');

describe('getContentType', () => {
    test('returns the first message type key', () => {
        const msg = { conversation: 'hi' };
        expect(getContentType(msg)).toBe('conversation');
    });

    test('returns undefined for empty message', () => {
        expect(getContentType({})).toBeUndefined();
    });

    test('returns undefined for null', () => {
        expect(getContentType(null)).toBeUndefined();
    });
});

describe('extractUrlFromText', () => {
    test('extracts https URL from text', () => {
        const text = 'check this https://example.com/path';
        expect(extractUrlFromText(text)).toBe('https://example.com/path');
    });

    test('returns undefined for text without URL', () => {
        expect(extractUrlFromText('hello world')).toBeUndefined();
    });

    test('returns undefined for empty text', () => {
        expect(extractUrlFromText('')).toBeUndefined();
    });
});
