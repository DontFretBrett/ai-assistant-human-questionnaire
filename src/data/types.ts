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

export interface QuestionnaireData {
  [questionId: string]: string
}
