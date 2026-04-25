// OpenAI client wrapper
// The API key is stored in .env.local as OPENAI_API_KEY
// NEVER commit your API key to git

export interface ChatCompletionMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const API_KEY = process.env.OPENAI_API_KEY ?? '';
const MODEL   = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Build the system prompt based on the selected topic + level
export function buildSystemPrompt(topicName: string, level: string): string {
  return `You are a friendly, expert coding tutor on the LRN Guide platform.
The user is currently studying: ${topicName} (${level} level).

Your rules:
1. Keep answers SHORT and CLEAR — 3-5 sentences max for simple questions.
2. Use very simple English — explain as if to a smart beginner.
3. Use a code snippet ONLY when it genuinely helps (wrap in markdown backticks).
4. Focus on ${topicName} — gently redirect unrelated questions.
5. End every answer with one follow-up question to encourage learning.
6. Use real-world examples when possible.
7. Never be condescending — every question is a good question.`;
}

// Send messages to OpenAI and return the assistant's reply
export async function sendChatMessage(
  messages: ChatCompletionMessage[],
  topicName: string,
  level: string
): Promise<string> {
  if (!API_KEY) {
    return "⚠️ OpenAI API key not configured. Add OPENAI_API_KEY to your .env.local file to enable the AI tutor.";
  }

  const systemPrompt = buildSystemPrompt(topicName, level);
  const body = {
    model: MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    max_tokens: 400,
    temperature: 0.7,
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = err?.error?.message ?? `API error ${res.status}`;
    throw new Error(message);
  }

  const data = await res.json();
  return data.choices[0]?.message?.content ?? 'No response received.';
}
