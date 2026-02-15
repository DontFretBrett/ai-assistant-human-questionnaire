export type CategoryId =
  | 'basics'
  | 'work'
  | 'hobbies'
  | 'friends'
  | 'interesting_facts'
  | 'likes'
  | 'dislikes'
  | 'political_opinions'
  | 'spouse'
  | 'children'
  | 'worldview'
  | 'ambitions'
  | 'accomplishments'
  | 'education'

export type AgentCategoryId =
  | 'identity'
  | 'personality'
  | 'core_truths'
  | 'boundaries'
  | 'interaction_style'
  | 'goals'
  | 'proactive_behavior'
  | 'safety_limits'

export type QuestionnaireMode = 'human' | 'agent'

export interface Question {
  id: string
  text: string
  placeholder?: string
}

export interface Category {
  id: CategoryId
  name: string
  icon: string
  description: string
  questions: Question[]
}

export interface AgentQuestion {
  id: string
  text: string
  placeholder?: string
}

export interface AgentCategory {
  id: AgentCategoryId
  name: string
  icon: string
  description: string
  questions: AgentQuestion[]
}

export interface QuestionnaireData {
  [questionId: string]: string
}
