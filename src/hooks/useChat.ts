import { useAppStore } from '@/store/appStore';
import { sendChatMessage, ChatCompletionMessage } from '@/lib/openai';
import { getTopicById } from '@/data/topics';

export function useChat() {
  const {
    chatMessages,
    isChatLoading,
    selectedTopicId,
    selectedLevel,
    addChatMessage,
    setChatLoading,
    clearChat,
  } = useAppStore();

  const topic = getTopicById(selectedTopicId);
  const topicName = topic?.name ?? selectedTopicId;

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isChatLoading) return;

    // Add user message immediately
    addChatMessage({ role: 'user', content: trimmed });
    setChatLoading(true);

    try {
      // Build the message history for context (last 10 messages)
      const history: ChatCompletionMessage[] = chatMessages
        .slice(-10)
        .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));

      history.push({ role: 'user', content: trimmed });

      const reply = await sendChatMessage(history, topicName, selectedLevel);
      addChatMessage({ role: 'assistant', content: reply });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      addChatMessage({
        role: 'assistant',
        content: `❌ Error: ${message}`,
      });
    } finally {
      setChatLoading(false);
    }
  };

  return {
    messages: chatMessages,
    isLoading: isChatLoading,
    sendMessage,
    clearChat,
    topicName,
  };
}
