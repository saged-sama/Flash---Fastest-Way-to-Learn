import { RAGChat, upstash } from "@upstash/rag-chat";
import { redis } from "@/lib/Chatbot/redis";

export const ragChat = new RAGChat({
  model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
  redis: redis,
});