interface ChatGPTModel {
    model: 'gpt-3.5-turbo';
}
interface ChatGPTResponse {
    message: string;
    error: string;
}

interface ChatGPTPrompt {
    body: {
        model: ChatGPTModel;
        messages: string[];
    }
}

interface Prompt {
    url: string;
}
export const askChatGPT = async ({ url }:Prompt) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer${process.env.REACT_APP_CHAT_GPT_TOKEN}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    "content": prompt
                }
            ],
            max_tokens: 150,
        })
    }).then((response) => response.json())
    .then((data) => {
        return data;
    }).catch((error) => {
        return error;
    });
}
const chatGPTApiKey = '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';
const chatGPTApiUrl = 'https://api.openai.com/v1/chat/completions';
const connect = async () => {

}