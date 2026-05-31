# <div align='center'>Baileys - WhatsApp Web API</div>

<div align='center'>

![Baileys](https://avatars.githubusercontent.com/u/250554332?v=4)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](package.json)
[![GitHub release](https://img.shields.io/github/v/release/Manuel5906/baileys)](https://github.com/Manuel5906/baileys/releases)
[![Docs](https://img.shields.io/badge/docs-online-blue)](https://github.com/IsolatedLabs/baileys)

</div>

Baileys es una librería open-source que te permite crear automatizaciones, bots e integraciones directamente con WhatsApp usando WebSocket, sin necesidad de un navegador.

Soporta mensajes interactivos, botones, menús dinámicos, administración de chats y grupos, y está actualizada con la función multi-dispositivo de WhatsApp.

---

## Documentación

📖 **Guía completa de uso**: [https://github.com/IsolatedLabs/baileys](https://github.com/IsolatedLabs/baileys)

---

## Instalación

```bash
npm install @IsolatedLabs/baileys
```

## Uso básico

```javascript
// Opción 1 — con el paquete instalado como @darkcore/baileys
const { default: makeWASocket } = require('@darkcore/baileys');

// Opción 2 — con el paquete instalado como baileys (alias local)
// const { default: makeWASocket } = require('baileys');
```

---

## Tipos de mensaje

### Album Message (varias imágenes)
```javascript
await sock.sendMessage(jid, { 
    albumMessage: [
        { image: maskurtu, caption: "Foto primera" },
        { image: { url: "https://example.com/img.jpg" }, caption: "Foto segunda" }
    ] 
}, { quoted: m });
```

### Event Message
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
```javascript
await sock.sendMessage(jid, { 
    pollResultMessage: { 
        name: "Hello World", 
        pollVotes: [
            { optionName: "TEST 1", optionVoteCount: "112233" },
            { optionName: "TEST 2", optionVoteCount: "1" }
        ] 
    } 
}, { quoted: m });
```

### Simple Interactive Message
```javascript
await sock.sendMessage(jid, {
    interactiveMessage: {
        header: "Hello World",
        title: "Hello World",
        footer: "Your footer here",
        buttons: [{
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
                display_text: "Copy Code",
                id: "123456789",
                copy_code: "ABC123XYZ"
            })
        }]
    }
}, { quoted: m });
```

### Interactive Message with Native Flow
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
                        sections: [{                  
                            title: "Section 1",                  
                            highlight_label: "Popular",                  
                            rows: [{                      
                                title: "Option 1",                      
                                description: "Description here",                      
                                id: "row_1"                    
                            }]                
                        }],              
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
```javascript
await sock.sendMessage(jid, {
    interactiveMessage: {
        header: "Hello World",
        title: "Hello World",
        footer: "Your footer here",
        image: { url: "https://example.com/image.jpg" },
        buttons: [{
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
                display_text: "Copy Code",
                id: "123456789",
                copy_code: "ABC123XYZ"
            })
        }]
    }
}, { quoted: m });
```

### Product Message
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
        buttons: [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: "Buy Now",
                url: "https://example.com/buy"
            })
        }]
    }
}, { quoted: m });
```

### Interactive Message with Document Buffer
> **Nota**: Los documentos solo soportan buffer.

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
        buttons: [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: "Visit Site",
                url: "https://example.com",
                merchant_url: "https://example.com"
            })
        }]
    }
}, { quoted: m });
```

### Interactive Message with Document Buffer (Simple)
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
        buttons: [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: "Visit Site",
                url: "https://example.com",
                merchant_url: "https://example.com"
            })
        }]
    }
}, { quoted: m });
```

### Request Payment Message
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

## Por qué Baileys?

- **Pareo estable** — menos fallos y desconexiones
- **Mensajes interactivos** — botones, menús dinámicos y native flows
- **Multi-dispositivo** — compatible con la última versión de WhatsApp
- **Ligero y modular** — fácil de integrar y personalizar
- **Mantenimiento activo** — actualizaciones regulares de estabilidad y rendimiento

---

**Gracias por usar nuestra librería. Seguimos mejorándola para mantenerla al día con las necesidades de la comunidad.**

**Nuestra organización le quiere decir las grandes gracias a nuestro miembro "Manuel5906" por entregar su proyecto hacia el IsolatedLabs, Todos los creditos del codigo son de su propiedad y de IsolatedLabs**

📖 **Documentación completa**: [https://github.com/IsolatedLabs/baileys](https://github.com/IsolatedLabs/baileys)
