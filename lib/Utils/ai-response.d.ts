export interface CodeBlockPart {
    type: 'text' | 'code';
    content: string;
    lang?: string;
}
export declare function parseCodeBlocks(text: string): CodeBlockPart[];
export declare function sendAIResponse(conn: any, m: any, data: any): Promise<void>;
