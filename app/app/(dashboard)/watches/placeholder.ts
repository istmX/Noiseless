import { Watch } from "./types";

export const mockWatches: Watch[] = [
  {
    id: "watch-1",
    userId: "user-1",
    topic: "OpenAI Product Announcements",
    searchQueries: ["site:openai.com/blog", "OpenAI release"],
    frequency: "hourly",
    significanceThreshold: 8,
    notificationEmail: "alerts@example.com",
    notificationSlackWebhook: null,
    lastRunAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    runInProgress: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      findings: 142,
      digests: 12,
    },
  },
  {
    id: "watch-2",
    userId: "user-1",
    topic: "Competitor Analysis: Anthropic",
    searchQueries: ["Anthropic Claude 3 update", "Anthropic new features"],
    frequency: "daily",
    significanceThreshold: 6,
    notificationEmail: null,
    notificationSlackWebhook: "https://hooks.slack.com/...",
    lastRunAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    runInProgress: false,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      findings: 37,
      digests: 4,
    },
  },
  {
    id: "watch-3",
    userId: "user-1",
    topic: "AI Agent Frameworks",
    searchQueries: ["LangChain updates", "AutoGPT alternatives", "Agentic architecture patterns"],
    frequency: "weekly",
    significanceThreshold: 4,
    notificationEmail: null,
    notificationSlackWebhook: null,
    lastRunAt: null,
    runInProgress: false,
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      findings: 0,
      digests: 0,
    },
  },
];
