# <div align='center'>Baileys - WhatsApp Web API</div>

<div align='center'>

![Baileys](https://avatars.githubusercontent.com/u/250554332?v=4)

</div>

Looking to build something cool with WhatsApp? Check out Baileys - an open-source library that lets you create smooth automations and integrations directly with WhatsApp. Instead of relying on a browser, it uses websocket technology to keep things light and efficient.

With Baileys, you can handle messages, manage chats and groups, create interactive messages with buttons, and build dynamic menus for a richer experience. It's actively maintained, so updates regularly roll out to boost stability and performance.

Whether you're building a business bot, a customer service helper, or any kind of chat automation, Baileys is built to stay stable and packed with features.

## How to use?

Install the package:
```bash
npm install github:Manuel5906/baileys
```

Import and create a connection:
```javascript
const {
    default: makeWASocket,
    useMultiFileAuthState,
    Browsers,
    DisconnectReason,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
    proto,
    getAggregateVotesInPollMessage,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    delay,
    areJidsSameUser
} = require('baileys');
```

### Why developers like it:

- Pairing is more stable now - fewer fails and disconnections
- Supports interactive messages, buttons, and dynamic menus
- Manages sessions smoothly in the background
- Works with WhatsApp's latest multi-device feature
- Lightweight and modular design for easy integration and customization

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
        joinLink: "https://example.com/event", 
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
        footer: "Your footer here",
        buttons: [
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "Copy Code",
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
        footer: "Your footer here",      
        image: { url: "https://example.com/image.jpg" },      
        nativeFlowMessage: {        
            messageParamsJson: JSON.stringify({          
                limited_time_offer: {            
                    text: "Limited offer",            
                    url: "https://example.com/offer",            
                    copy_code: "OFFER2024",            
                    expiration_time: Date.now() * 999          
                },          
                bottom_sheet: {            
                    in_thread_buttons_limit: 2,            
                    divider_indices: [1, 2, 3, 4, 5, 999],            
                    list_title: "Select an option",            
                    button_title: "View options"          
                },          
                tap_target_configuration: {            
                    title: "Shop Now",            
                    description: "Check our latest products",            
                    canonical_url: "https://example.com/shop",            
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
                        title: "Options",              
                        sections: [                
                            {                  
                                title: "Section 1",                  
                                highlight_label: "Popular",                  
                                rows: [                    
                                    {                      
                                        title: "Option 1",                      
                                        description: "Description here",                      
                                        id: "row_1"                    
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
                        display_text: "Copy Code",              
                        id: "123456789",              
                        copy_code: "ABC123XYZ"            
                    })          
                }        
            ]      
        }    
    }  
}, { quoted: m });
```

### Interactive Message with Image
Send interactive messages with image and copy button:

```javascript
await sock.sendMessage(jid, {
    interactiveMessage: {
        header: "Hello World",
        title: "Hello World",
        footer: "Your footer here",
        image: { url: "https://example.com/image.jpg" },
        buttons: [
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "Copy Code",
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
        title: "Sample Product",
        description: "This is a product description",
        thumbnail: { url: "https://example.com/image.jpg" },
        productId: "PROD001",
        retailerId: "RETAIL001",
        url: "https://example.com/product",
        body: "Product details",
        footer: "Special price",
        priceAmount1000: 50000,
        currencyCode: "USD",
        buttons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Buy Now",
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
        footer: "Your footer here",
        document: fs.readFileSync("./package.json"),
        mimetype: "application/pdf",
        fileName: "document.pdf",
        jpegThumbnail: fs.readFileSync("./document.jpeg"),
        contextInfo: {
            mentionedJid: [jid],
            forwardingScore: 777,
            isForwarded: false
        },
        externalAdReply: {
            title: "My Bot",
            body: "Check this out",
            mediaType: 3,
            thumbnailUrl: "https://example.com/image.jpg",
            mediaUrl: "https://example.com",
            sourceUrl: "https://example.com",
            showAdAttribution: true,
            renderLargerThumbnail: false         
        },
        buttons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Visit Site",
                    url: "https://example.com",
                    merchant_url: "https://example.com"
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
        footer: "Your footer here",
        document: fs.readFileSync("./package.json"),
        mimetype: "application/pdf",
        fileName: "document.pdf",
        jpegThumbnail: fs.readFileSync("./document.jpeg"),
        buttons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Visit Site",
                    url: "https://example.com",
                    merchant_url: "https://example.com"
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

## Why choose Baileys?

This library delivers exceptional stability, a comprehensive feature set, and a continuously refined pairing process making it the ideal choice for building professional, secure WhatsApp automation. It stays current with WhatsApp's latest updates, so your projects remain compatible and future-proof.

---

### Technical Highlights

- Stable, secure custom pairing with resolved authentication issues
- Support for interactive messages, action buttons, and dynamic menus
- Efficient automatic session management for long-term reliability
- Full compatibility with WhatsApp's multi-device feature
- Easy to integrate and customize based on your needs
- Perfect for developing bots, customer service automation, and other communication applications

---

**Thanks for using our library! We're constantly improving it to keep up with the evolving needs of developers working on WhatsApp automation.**
