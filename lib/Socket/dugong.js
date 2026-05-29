"use strict";
const WAProto = require('../../WAProto').proto;
const crypto = require('crypto');
const Utils_1 = require("../Utils");

class maskurtu {
    constructor(utils, waUploadToServer, relayMessageFn) {
        this.utils = utils;
        this.relayMessage = relayMessageFn;
        this.waUploadToServer = waUploadToServer;
        this.bail = {
            generateWAMessageContent: this.utils.generateWAMessageContent || Utils_1.generateWAMessageContent,
            generateMessageID: Utils_1.generateMessageID,
            getContentType: (msg) => Object.keys(msg.message || {})[0]
        };
    }

    detectType(content) {
        if (content.requestPaymentMessage) return 'PAYMENT';
        if (content.productMessage) return 'PRODUCT';
        if (content.interactiveMessage) return 'INTERACTIVE';
        if (content.albumMessage) return 'ALBUM';
        if (content.eventMessage) return 'EVENT';
        if (content.pollResultMessage) return 'POLL_RESULT';
        if (content.groupStatusMessage) return 'GROUP_STORY';
        return null;
    }

    async handlePayment(content, quoted) {
        const data = content.requestPaymentMessage;
        let notes = {};

        if (data.sticker?.stickerMessage) {
            notes = {
                stickerMessage: {
                    ...data.sticker.stickerMessage,
                    contextInfo: {
                        stanzaId: quoted?.key?.id,
                        participant: quoted?.key?.participant || content.sender,
                        quotedMessage: quoted?.message
                    }
                }
            };
        } else if (data.note) {
            notes = {
                extendedTextMessage: {
                    text: data.note,
                    contextInfo: {
                        stanzaId: quoted?.key?.id,
                        participant: quoted?.key?.participant || content.sender,
                        quotedMessage: quoted?.message
                    }
                }
            };
        }

        return {
            requestPaymentMessage: WAProto.Message.RequestPaymentMessage.fromObject({
                expiryTimestamp: data.expiry || 0,
                amount1000: data.amount || 0,
                currencyCodeIso4217: data.currency || "IDR",
                requestFrom: data.from || "0@s.whatsapp.net",
                noteMessage: notes,
                background: data.background ?? {
                    id: "DEFAULT",
                    placeholderArgb: 0xFFF0F0F0
                }
            })
        };
    }

    async handleProduct(content, jid, quoted) {
        const {
            title,
            description,
            thumbnail,
            productId,
            retailerId,
            url,
            body = "",
            footer = "",
            buttons = [],
            priceAmount1000 = null,
            currencyCode = "IDR"
        } = content.productMessage;

        let productImage;

        if (Buffer.isBuffer(thumbnail)) {
            const { imageMessage } = await this.utils.generateWAMessageContent(
                { image: thumbnail },
                { upload: this.waUploadToServer }
            );
            productImage = imageMessage;
        } else if (typeof thumbnail === 'object' && thumbnail.url) {
            const { imageMessage } = await this.utils.generateWAMessageContent(
                { image: { url: thumbnail.url } },
                { upload: this.waUploadToServer }
            );
            productImage = imageMessage;
        }

        return {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: { text: body },
                        footer: { text: footer },
                        header: {
                            title,
                            hasMediaAttachment: true,
                            productMessage: {
                                product: {
                                    productImage,
                                    productId,
                                    title,
                                    description,
                                    currencyCode,
                                    priceAmount1000,
                                    retailerId,
                                    url,
                                    productImageCount: 1
                                },
                                businessOwnerJid: jid
                            }
                        },
                        nativeFlowMessage: { buttons }
                    }
                }
            }
        };
    }

    async handleInteractive(content, jid, quoted) {
        const {
            title,
            footer,
            subtitle,
            thumbnail,
            image,
            video,
            document,
            mimetype,
            fileName,
            jpegThumbnail,
            contextInfo,
            externalAdReply,
            buttons = [],
            nativeFlowMessage,
            header
        } = content.interactiveMessage;

        let media = null;
        let hasMedia = false;

        if (image) {
            const imagePayload = typeof image === 'object' && image.url
                ? { image: { url: image.url } }
                : { image };
            media = await this.utils.prepareWAMessageMedia(
                imagePayload,
                { upload: this.waUploadToServer }
            );
            hasMedia = true;
        } else if (video) {
            const videoPayload = typeof video === 'object' && video.url
                ? { video: { url: video.url } }
                : { video };
            media = await this.utils.prepareWAMessageMedia(
                videoPayload,
                { upload: this.waUploadToServer }
            );
            hasMedia = true;
        } else if (document) {
            const docPayload = { document };
            if (jpegThumbnail) {
                docPayload.jpegThumbnail = typeof jpegThumbnail === 'object' && jpegThumbnail.url
                    ? { url: jpegThumbnail.url }
                    : jpegThumbnail;
            }
            media = await this.utils.prepareWAMessageMedia(
                docPayload,
                { upload: this.waUploadToServer }
            );
            if (fileName) {
                media.documentMessage.fileName = fileName;
            }
            if (mimetype) {
                media.documentMessage.mimetype = mimetype;
            }
            if (thumbnail) {
                media.documentMessage.jpegThumbnail = typeof thumbnail === 'object' && thumbnail.url
                    ? { url: thumbnail.url }
                    : thumbnail;
            }
            hasMedia = true;
        } else if (thumbnail) {
            const thumbPayload = typeof thumbnail === 'object' && thumbnail.url
                ? { image: { url: thumbnail.url } }
                : { image: thumbnail };
            media = await this.utils.prepareWAMessageMedia(
                thumbPayload,
                { upload: this.waUploadToServer }
            );
            hasMedia = true;
        }

        let interactiveMessage = {
            body: { text: title || "" },
            footer: { text: footer || "" }
        };

        if (buttons.length > 0 || nativeFlowMessage) {
            interactiveMessage.nativeFlowMessage = {
                buttons: buttons.length > 0 ? buttons : undefined,
                ...(nativeFlowMessage || {})
            };
        }

        if (hasMedia && media) {
            interactiveMessage.header = {
                title: header || "",
                subtitle: subtitle || undefined,
                hasMediaAttachment: true,
                ...media
            };
        } else {
            interactiveMessage.header = {
                title: header || "",
                subtitle: subtitle || undefined,
                hasMediaAttachment: false
            };
        }

        if (contextInfo || externalAdReply) {
            interactiveMessage.contextInfo = {
                ...(contextInfo || {}),
                externalAdReply: externalAdReply || contextInfo?.externalAdReply
            };
        }

        return { interactiveMessage };
    }

    async handleAlbum(content, jid, quoted) {
        const array = content.albumMessage;
        const album = await this.utils.generateWAMessageFromContent(jid, {
            messageContextInfo: {
                messageSecret: crypto.randomBytes(32),
            },
            albumMessage: {
                expectedImageCount: array.filter((a) => a.hasOwnProperty("image")).length,
                expectedVideoCount: array.filter((a) => a.hasOwnProperty("video")).length,
            },
        }, {
            userJid: this.utils.generateMessageID().split('@')[0] + '@s.whatsapp.net',
            quoted,
            upload: this.waUploadToServer
        });

        await this.relayMessage(jid, album.message, {
            messageId: album.key.id,
        });

        for (let content of array) {
            const img = await this.utils.generateWAMessage(jid, content, {
                upload: this.waUploadToServer,
            });

            img.message.messageContextInfo = {
                messageSecret: crypto.randomBytes(32),
                messageAssociation: {
                    associationType: 1,
                    parentMessageKey: album.key,
                },
            };

            await this.relayMessage(jid, img.message, {
                messageId: img.key.id,
            });
        }
        return album;
    }

    async handleEvent(content, jid, quoted) {
        const eventData = content.eventMessage;

        const msg = await this.utils.generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2,
                        messageSecret: crypto.randomBytes(32),
                        supportPayload: JSON.stringify({
                            version: 2,
                            is_ai_message: true,
                            should_show_system_message: true,
                            ticket_id: crypto.randomBytes(16).toString('hex')
                        })
                    },
                    eventMessage: {
                        contextInfo: {
                            mentionedJid: [jid],
                            participant: jid
                        },
                        isCanceled: eventData.isCanceled || false,
                        name: eventData.name,
                        description: eventData.description,
                        location: eventData.location || {
                            degreesLatitude: 0,
                            degreesLongitude: 0,
                            name: "Location"
                        },
                        joinLink: eventData.joinLink || '',
                        startTime: typeof eventData.startTime === 'string' ? parseInt(eventData.startTime) : eventData.startTime || Date.now(),
                        endTime: typeof eventData.endTime === 'string' ? parseInt(eventData.endTime) : eventData.endTime || Date.now() + 3600000,
                        extraGuestsAllowed: eventData.extraGuestsAllowed !== false
                    }
                }
            }
        }, { quoted });

        await this.relayMessage(jid, msg.message, {
            messageId: msg.key.id
        });
        return msg;
    }

    async handlePollResult(content, jid, quoted) {
        const pollData = content.pollResultMessage;

        const msg = await this.utils.generateWAMessageFromContent(jid, {
            pollResultSnapshotMessage: {
                name: pollData.name,
                pollVotes: pollData.pollVotes.map(vote => ({
                    optionName: vote.optionName,
                    optionVoteCount: typeof vote.optionVoteCount === 'number'
                        ? vote.optionVoteCount.toString()
                        : vote.optionVoteCount
                }))
            }
        }, {
            userJid: this.utils.generateMessageID().split('@')[0] + '@s.whatsapp.net',
            quoted
        });

        await this.relayMessage(jid, msg.message, {
            messageId: msg.key.id
        });

        return msg;
    }

    async handleGroupStory(content, jid, quoted) {
        const storyData = content.groupStatusMessage;
        let waMsgContent;

        if (storyData.message) {
            waMsgContent = storyData;
        } else if (typeof this.bail?.generateWAMessageContent === "function") {
            waMsgContent = await this.bail.generateWAMessageContent(storyData, {
                upload: this.waUploadToServer
            });
        } else {
            waMsgContent = await Utils_1.generateWAMessageContent(storyData, {
                upload: this.waUploadToServer
            });
        }

        let msg = {
            message: {
                groupStatusMessageV2: {
                    message: waMsgContent.message || waMsgContent
                }
            }
        };

        return await this.relayMessage(jid, msg.message, {
            messageId: this.bail.generateMessageID()
        });
    }
}

module.exports = maskurtu;
