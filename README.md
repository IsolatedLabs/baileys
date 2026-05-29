# <div align='center'>WhatsApp Web API</div>

<div align='center'>

![WhatsApp API by Kurtu Coben](https://raw.githubusercontent.com/KurtuCoben/KurtuCoben-baileys/main/%40kurtucoben-baileys.jpg)

</div>

Looking to build something cool with WhatsApp? Check out WhatsApp Baileys an open-source library that lets you create smooth automations and integrations directly with WhatsApp. Instead of relying on a browser, it uses websocket technology to keep things light and efficient.

With Baileys, you can handle messages, manage chats and groups, create interactive messages with buttons, and build dynamic menus for a richer experience. It’s actively maintained, so updates regularly roll out to boost stability and performance. One big focus has been improving the pairing and login process making it more secure, reliable, and way less likely to drop off unexpectedly. You can even customize the pairing with your own code for extra control.

Whether you’re building a business bot, a customer service helper, or any kind of chat automation, Baileys is built to stay stable and packed with features. It’s designed to be modular and easy to plug into different systems, so you won’t get bogged down.

## How to use?

just type like this shit
```bash
npm install @kurtucoben/baileys
```
or
```bash
yarn add @kurtucoben/baileys
```
import your code to create a connection to the library
```javascript
const {
    default: makeWASocket,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    useMultiFileAuthState,
    Browsers,
    DisconnectReason,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
    proto,
    PHONENUMBER_MCC,
    getAggregateVotesInPollMessage,
    delay,
    areJidsSameUser
} = require('@kurtucoben/baileys');
```
```javascript
const {
   default: WAConnection, makeWAMessage, 
   makeCacheableSignalKeyStore, downloadContentFromMessage, 
   emitGroupParticipantsUpdate, emitGroupUpdate, 
   generateWAMessageContent, generateWAMessage, 
   makeInMemoryStore, prepareWAMessageMedia, 
   generateWAMessageFromContent, MediaType, 
   areJidsSameUser, WAMessageStatus, 
   downloadAndSaveMediaMessage, AuthenticationState, 
   GroupMetadata, initInMemoryKeyStore, getContentType, 
   MiscMessageGenerationOptionsuseSingleFileAuthState, BufferJSON, 
   WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, 
   ChatModification, MessageTypeProto, WALocationMessage, 
   ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, 
   waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, 
   WAContactsArrayMessage, WAGroupInviteMessage, 
   WATextMessage, WAMessageContent, WAMessage, BaileysError, 
   WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, 
   WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, 
   Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, 
   Mimetype, relayWAMessage, Browsers, GroupSettingChange,
   DisconnectReason, getStream, WAProto, isBaileys, PHONENUMBER_MCC, 
   AnyMessageContent, useMultiFileAuthState, fetchLatestBaileysVersion, 
   templateMessage, InteractiveMessage, Header } = require("@kurtucoben/baileys");
```
---
# Links

#### Social Media
- [Instagram](https://www.instagram.com/krtucbens)

#### Follow For More Updates & Information
- [WhatsApp Channel](https://whatsapp.com/channel/0029VajIECpGU3BIejJB1t18)

<div align='center'>

![Kurt Cobain Smile For You](https://raw.githubusercontent.com/KurtuCoben/KurtuCoben-baileys/main/kurtcobain.gif)

</div>

### Why developers like it:

- Pairing is more stable now - fewer fails and disconnections
- Supports interactive messages, buttons, and dynamic menus
- Supports interactive messages, action buttons, and dynamic menus
- Manages sessions smoothly in the background
- Works with WhatsApp’s latest multi-device feature
- Lightweight and modular design for easy integration and customization
- Comes with clear docs and ready-to-use examples

---

## Ready to start?

Grab the library via npm or your package manager of choice, tweak the config, and dive right in. The example code is a great place to see how everything fits together. Use session storage and interactive features to build something solid that fits your project perfectly.

---

## SendMessage Documentation

### Album Message (Multiple Images)
Send multiple images in a single album message:

```javascript
await sock.sendMessage(jid, { 
    albumMessage: [
        { image: maskurtu, caption: "Foto pertama" },
        { image: { url: "URL IMAGE" }, caption: "Foto kedua" }
    ] 
}, { quoted: m });
```

### Event Message
Create and send WhatsApp event invitations:

```javascript
await sock.sendMessage(jid, { 
    eventMessage: { 
        isCanceled: false, 
        name: "Hello World", 
        description: "lorem ipsum dolor sit amet", 
        location: { 
            degreesLatitude: 0, 
            degreesLongitude: 0, 
            name: "rowrrrr" 
        }, 
        joinLink: "https://call.whatsapp.com/video/krtucbens", 
        startTime: "1763019000", 
        endTime: "1763026200", 
        extraGuestsAllowed: false 
    } 
}, { quoted: m });
```

### Poll Result Message
Display poll results with vote counts:

```javascript
await sock.sendMessage(jid, { 
    pollResultMessage: { 
        name: "Hello World", 
        pollVotes: [
            {
                optionName: "TEST 1",
                optionVoteCount: "112233"
            },
            {
                optionName: "TEST 2",
                optionVoteCount: "1"
            }
        ] 
    } 
}, { quoted: m });
```

### Simple Interactive Message
Send basic interactive messages with copy button functionality:

```javascript
await sock.sendMessage(jid, {
    interactiveMessage: {
        header: "Hello World",
        title: "Hello World",
        footer: "instagram: @krtucbens ",
        buttons: [
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "copy code",
                    id: "123456789",              
                    copy_code: "ABC123XYZ"
                })
            }
        ]
    }
}, { quoted: m });
```

### Interactive Message with Native Flow
Send interactive messages with buttons, copy actions, and native flow features:

```javascript
await sock.sendMessage(jid, {    
    interactiveMessage: {      
        header: "Hello World",
        title: "Hello World",      
        footer: "instagram: @krtucbens",      
        image: { url: "https://example.com/image.jpg" },      
        nativeFlowMessage: {        
            messageParamsJson: JSON.stringify({          
                limited_time_offer: {            
                    text: "bahlil ajg",            
                    url: "https://ig.me/m/krtucbens",            
                    copy_code: "maskurtu",            
                    expiration_time: Date.now() * 999          
                },          
                bottom_sheet: {            
                    in_thread_buttons_limit: 2,            
                    divider_indices: [1, 2, 3, 4, 5, 999],            
                    list_title: "lorem ipsum dolor sit amet",            
                    button_title: "lorem ipsum dolor sit amet"          
                },          
                tap_target_configuration: {            
                    title: " X ",            
                    description: "FawkNyggers",            
                    canonical_url: "https://ig.me/m/krtucbens",            
                    domain: "shop.example.com",            
                    button_index: 0          
                }        
            }),        
            buttons: [          
                {            
                    name: "single_select",            
                    buttonParamsJson: JSON.stringify({              
                        has_multiple_buttons: true            
                    })          
                },          
                {            
                    name: "call_permission_request",            
                    buttonParamsJson: JSON.stringify({              
                        has_multiple_buttons: true            
                    })          
                },          
                {            
                    name: "single_select",            
                    buttonParamsJson: JSON.stringify({              
                        title: "Hello World",              
                        sections: [                
                            {                  
                                title: "title",                  
                                highlight_label: "label",                  
                                rows: [                    
                                    {                      
                                        title: "maskurtu",                      
                                        description: "lop yu",                      
                                        id: "row_2"                    
                                    }                  
                                ]                
                            }              
                        ],              
                        has_multiple_buttons: true            
                    })          
                },          
                {            
                    name: "cta_copy",            
                    buttonParamsJson: JSON.stringify({              
                        display_text: "copy code",              
                        id: "123456789",              
                        copy_code: "ABC123XYZ"            
                    })          
                }        
            ]      
        }    
    }  
}, { quoted: m });
```

### Interactive Message with Thumbnail
Send interactive messages with thumbnail image and copy button:

```javascript
await sock.sendMessage(jid, {
    interactiveMessage: {
        header: "Hello World",
        title: "Hello World",
        footer: "Instagram: @krtucbens",
        image: { url: "https://example.com/image.jpg" },
        buttons: [
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "copy code",
                    id: "123456789",
                    copy_code: "ABC123XYZ"
                })
            }
        ]
    }
}, { quoted: m });
```

### Product Message
Send product catalog messages with buttons and merchant information:

```javascript
await sock.sendMessage(jid, {
    productMessage: {
        title: "Produk Contoh",
        description: "Ini adalah deskripsi produk",
        thumbnail: { url: "https://example.com/image.jpg" },
        productId: "PROD001",
        retailerId: "RETAIL001",
        url: "https://example.com/product",
        body: "Detail produk",
        footer: "Harga spesial",
        priceAmount1000: 50000,
        currencyCode: "USD",
        buttons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Beli Sekarang",
                    url: "https://example.com/buy"
                })
            }
        ]
    }
}, { quoted: m });
```

### Interactive Message with Document Buffer
Send interactive messages with document from buffer (file system) - **Note: Documents only support buffer**:

```javascript
await sock.sendMessage(jid, {
    interactiveMessage: {
        header: "Hello World",
        title: "Hello World",
        footer: "Instagram: @krtucbens",
        document: fs.readFileSync("./package.json"),
        mimetype: "application/pdf",
        fileName: "Epstein.pdf",
        jpegThumbnail: fs.readFileSync("./document.jpeg"),
        contextInfo: {
            mentionedJid: [jid],
            forwardingScore: 777,
            isForwarded: false
        },
        externalAdReply: {
            title: "Wabot",
            body: "bot wacap",
            mediaType: 3,
            thumbnailUrl: "https://example.com/image.jpg",
            mediaUrl: " X ",
            sourceUrl: "https://ig.me/m/krtucbens",
            showAdAttribution: true,
            renderLargerThumbnail: false         
        },
        buttons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Instagram",
                    url: "https://ig.me/m/krtucbens",
                    merchant_url: "https://ig.me/m/krtucbens"
                })
            }
        ]
    }
}, { quoted: m });
```

### Interactive Message with Document Buffer (Simple)
Send interactive messages with document from buffer (file system) without contextInfo and externalAdReply - **Note: Documents only support buffer**:

```javascript
await sock.sendMessage(jid, {
    interactiveMessage: {
        header: "Hello World",
        title: "Hello World",
        footer: "Instagram: @krtucbens",
        document: fs.readFileSync("./package.json"),
        mimetype: "application/pdf",
        fileName: "Epstein.pdf",
        jpegThumbnail: fs.readFileSync("./document.jpeg"),
        buttons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Instagram",
                    url: "https://ig.me/m/krtucbens",
                    merchant_url: "https://ig.me/m/krtucbens"
                })
            }
        ]
    }
}, { quoted: m });
```

### Request Payment Message
Send payment request messages with custom background and sticker:

```javascript
let quotedType = m.quoted?.mtype || '';
let quotedContent = JSON.stringify({ [quotedType]: m.quoted }, null, 2);

await sock.sendMessage(jid, {
    requestPaymentMessage: {
        currency: "IDR",
        amount: 10000000,
        from: m.sender,
        sticker: JSON.parse(quotedContent),
        background: {
            id: "100",
            fileLength: "0",
            width: 1000,
            height: 1000,
            mimetype: "image/webp",
            placeholderArgb: 0xFF00FFFF,
            textArgb: 0xFFFFFFFF,     
            subtextArgb: 0xFFAA00FF   
        }
    }
}, { quoted: m });
```

---

## Why should choose my baileys?

This library delivers exceptional stability, a comprehensive feature set, and a continuously refined pairing process making it the ideal choice for building professional, secure WhatsApp automation. It also stays current with WhatsApp’s latest updates, so your projects remain compatible and future-proof.

---

### Technical Highlights

- Stable, secure custom pairing with resolved authentication issues
- Support for interactive messages, action buttons, and dynamic menus
- Efficient automatic session management for long-term reliability
- Full compatibility with WhatsApp’s multi-device feature
- Compatible with the latest multi-device features from WhatsApp
- Easy to integrate and customize based on your needs
- Perfect for developing bots, customer service automation, and other communication applications

---

**Thanks for using our library! We're constantly improving it to keep up with the evolving needs of developers working on WhatsApp automation.**
