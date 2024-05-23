import axios from 'axios';
import { OLLAMA_URL } from './constants';
import { LLMModelResponse } from './models';

export async function generateOllamaResponse(data: any): Promise<LLMModelResponse> {
    const url = `${OLLAMA_URL}/api/generate`;
    try {
        const response = await axios.post(url, data);
        return response.data as LLMModelResponse;
    } catch (error) {
        console.error(`Error making POST request: ${error}`);
        throw error;
    }
}

export function constructPrompt(template: string, code: string): string {
    return template.replace('{code}', code);
}