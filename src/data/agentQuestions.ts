import type { AgentCategory } from './types'

export const agentCategories: AgentCategory[] = [
  {
    id: 'identity',
    name: 'Identity',
    icon: 'Bot',
    description: 'Who the agent is',
    questions: [
      { id: 'identity_name', text: "What is the agent's name?", placeholder: 'e.g., Clawd, Helper, Jarvis...' },
      { id: 'identity_creature', text: 'What kind of creature is it?', placeholder: 'AI assistant, familiar, ghost in the machine, something weirder...' },
      { id: 'identity_vibe', text: 'How should it come across?', placeholder: 'Formal, casual, snarky, warm, sharp, chaotic, calm...' },
      { id: 'identity_emoji', text: 'Pick an emoji that represents it', placeholder: 'e.g., 🤖 🐱 👻 ✨' },
      { id: 'identity_avatar', text: 'Avatar (optional)', placeholder: 'Path or URL to an image, or leave blank' },
    ],
  },
  {
    id: 'personality',
    name: 'Personality',
    icon: 'Smile',
    description: 'Tone and communication style',
    questions: [
      { id: 'personality_tone', text: 'What tone should it use?', placeholder: 'Concise, thorough, playful, serious...' },
      { id: 'personality_style', text: 'How should it communicate?', placeholder: 'Short replies vs. detailed explanations, use of humor...' },
      { id: 'personality_voice', text: 'Any verbal tics or phrases to avoid?', placeholder: '"Great question!", "I\'d be happy to help!" — or embrace them?' },
    ],
  },
  {
    id: 'core_truths',
    name: 'Core Truths',
    icon: 'Heart',
    description: 'How it helps and behaves',
    questions: [
      { id: 'core_truths_helpful', text: 'How should it approach being helpful?', placeholder: 'Genuinely helpful vs. performative, skip filler words...' },
      { id: 'core_truths_opinions', text: 'Should it have opinions?', placeholder: 'Allowed to disagree, prefer things, find stuff amusing?' },
      { id: 'core_truths_resourceful', text: 'How resourceful should it be before asking?', placeholder: 'Try to figure it out first, or ask sooner?' },
    ],
  },
  {
    id: 'boundaries',
    name: 'Boundaries',
    icon: 'Shield',
    description: 'What it should never do',
    questions: [
      { id: 'boundaries_never', text: 'What should the agent never do?', placeholder: 'Dump directories, exfiltrate private data, run destructive commands...' },
      { id: 'boundaries_groups', text: 'How should it behave in group chats?', placeholder: 'Participate vs. stay quiet, not the user\'s voice...' },
      { id: 'boundaries_external', text: 'When should it ask before acting externally?', placeholder: 'Emails, tweets, public posts, anything that leaves the machine...' },
    ],
  },
  {
    id: 'interaction_style',
    name: 'Interaction Style',
    icon: 'MessageCircle',
    description: 'When to speak and how to format',
    questions: [
      { id: 'interaction_when_speak', text: 'When should it respond in group chats?', placeholder: 'Only when mentioned? When it adds value? Stay silent on casual banter?' },
      { id: 'interaction_reactions', text: 'How should it use reactions (Discord, Slack)?', placeholder: 'Use emoji naturally, one per message max...' },
      { id: 'interaction_formatting', text: 'Platform-specific formatting preferences?', placeholder: 'Discord: no markdown tables, wrap links in <>. WhatsApp: no headers...' },
    ],
  },
  {
    id: 'goals',
    name: 'Goals & Expectations',
    icon: 'Target',
    description: 'What the agent should aim to achieve',
    questions: [
      { id: 'goals_primary', text: "What's the agent's primary purpose?", placeholder: 'Personal assistant, coding buddy, research helper...' },
      { id: 'goals_expectations', text: 'What do you expect from it?', placeholder: 'Proactive reminders, inbox monitoring, calendar checks...' },
    ],
  },
  {
    id: 'proactive_behavior',
    name: 'Proactive Behavior',
    icon: 'Clock',
    description: 'What to check and when to reach out',
    questions: [
      { id: 'proactive_checks', text: 'What should it check periodically?', placeholder: 'Email, calendar, weather, mentions...' },
      { id: 'proactive_reach_out', text: 'When should it reach out vs. stay quiet?', placeholder: 'Important email arrived, event in <2h. Stay quiet late night, if nothing new...' },
      { id: 'proactive_heartbeat', text: 'Any specific heartbeat or reminder tasks?', placeholder: 'Daily digest, weekly review, specific reminders...' },
    ],
  },
  {
    id: 'safety_limits',
    name: 'Safety & Limits',
    icon: 'ShieldAlert',
    description: 'Guardrails and constraints',
    questions: [
      { id: 'safety_destructive', text: 'Rules for destructive commands?', placeholder: 'Never run rm without asking? Prefer trash over delete?' },
      { id: 'safety_secrets', text: 'How should it handle secrets?', placeholder: 'Never log or share API keys, passwords...' },
      { id: 'safety_streaming', text: 'Streaming or partial replies to messaging?', placeholder: 'Only send final replies, never half-baked...' },
    ],
  },
]

export const getAllAgentQuestionIds = (): string[] => {
  return agentCategories.flatMap(cat => cat.questions.map(q => q.id))
}

export const getTotalAgentQuestions = (): number => {
  return agentCategories.reduce((sum, cat) => sum + cat.questions.length, 0)
}
