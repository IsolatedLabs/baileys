"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAIResponse = exports.parseCodeBlocks = void 0;
const parseCodeBlocks = (text) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;
    let lastIndex = 0;
    const parts = [];
    while ((match = codeBlockRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
        }
        parts.push({ type: 'code', lang: match[1] || 'javascript', content: match[2] });
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        parts.push({ type: 'text', content: text.slice(lastIndex) });
    }
    return parts;
};
exports.parseCodeBlocks = parseCodeBlocks;
const sendAIResponse = async (conn, m, data) => {
    if (!data)
        return;
    const respuesta = data.output?.[0]?.content || data.output ||
        data.response || data.message || data.result ||
        data.answer || data.text || data.data?.output;
    if (!respuesta)
        return;
    const parts = (0, exports.parseCodeBlocks)(respuesta);
    for (const part of parts) {
        if (part.type === 'code') {
            await conn.sendMessage(m.chat, { text: "```" + part.content + "```" }, { quoted: m });
        }
        else {
            await m.reply(part.content);
        }
    }
};
exports.sendAIResponse = sendAIResponse;
