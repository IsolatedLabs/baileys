"use strict";
const crypto = require('crypto');
const { Curve, hkdf, sha256, aesEncryptGCM, aesDecryptGCM, generateSignalPubKey } = require('../../lib/Utils/crypto');

describe('Curve', () => {
    test('generateKeyPair produces valid keys', () => {
        const keyPair = Curve.generateKeyPair();
        expect(keyPair.private).toBeInstanceOf(Buffer);
        expect(keyPair.public).toBeInstanceOf(Buffer);
        expect(keyPair.private.length).toBe(32);
        expect(keyPair.public.length).toBe(32);
    });

    test('sharedKey produces 32-byte shared secret', () => {
        const alice = Curve.generateKeyPair();
        const bob = Curve.generateKeyPair();
        const sharedAlice = Curve.sharedKey(alice.private, bob.public);
        const sharedBob = Curve.sharedKey(bob.private, alice.public);
        expect(sharedAlice).toBeInstanceOf(Buffer);
        expect(sharedAlice.length).toBe(32);
        expect(sharedAlice).toEqual(sharedBob);
    });

    test('sign and verify', () => {
        const keyPair = Curve.generateKeyPair();
        const message = Buffer.from('test message');
        const signature = Curve.sign(keyPair.private, message);
        expect(Curve.verify(keyPair.public, message, signature)).toBe(true);
    });
});

describe('generateSignalPubKey', () => {
    test('adds version byte to 32-byte key', () => {
        const key = crypto.randomBytes(32);
        const result = generateSignalPubKey(key);
        expect(result.length).toBe(33);
        expect(result[0]).toBe(5);
    });

    test('returns 33-byte key as-is', () => {
        const key = Buffer.concat([Buffer.from([5]), crypto.randomBytes(32)]);
        const result = generateSignalPubKey(key);
        expect(result.length).toBe(33);
    });
});

describe('AES GCM', () => {
    test('encrypt and decrypt roundtrip', () => {
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(12);
        const plaintext = Buffer.from('secret message');
        const aad = Buffer.from('additional data');
        const ciphertext = aesEncryptGCM(plaintext, key, iv, aad);
        const decrypted = aesDecryptGCM(ciphertext, key, iv, aad);
        expect(decrypted).toEqual(plaintext);
    });

    test('decrypt fails with wrong key', () => {
        const key = crypto.randomBytes(32);
        const wrongKey = crypto.randomBytes(32);
        const iv = crypto.randomBytes(12);
        const plaintext = Buffer.from('secret');
        const ciphertext = aesEncryptGCM(plaintext, key, iv, Buffer.from([]));
        expect(() => aesDecryptGCM(ciphertext, wrongKey, iv, Buffer.from([]))).toThrow();
    });
});

describe('hkdf', () => {
    test('derives key of specified length', () => {
        const ikm = crypto.randomBytes(32);
        const salt = crypto.randomBytes(32);
        const info = 'test-info';
        const key = hkdf(ikm, 64, { salt, info });
        expect(key).toBeInstanceOf(Buffer);
        expect(key.length).toBe(64);
    });

    test('same inputs produce same output', () => {
        const ikm = Buffer.from('test-ikm');
        const salt = Buffer.from('test-salt');
        const key1 = hkdf(ikm, 32, { salt, info: 'test' });
        const key2 = hkdf(ikm, 32, { salt, info: 'test' });
        expect(key1).toEqual(key2);
    });
});

describe('sha256', () => {
    test('produces 32-byte hash', () => {
        const hash = sha256(Buffer.from('test'));
        expect(hash).toBeInstanceOf(Buffer);
        expect(hash.length).toBe(32);
    });
});
