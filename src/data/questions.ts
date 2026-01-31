import type { Category } from './types'

export const categories: Category[] = [
  {
    id: 'work',
    name: 'Work',
    icon: 'Briefcase',
    description: 'Your professional life and career',
    questions: [
      { id: 'work_current', text: 'What is your current job or profession?', placeholder: 'e.g., Software engineer at a tech startup' },
      { id: 'work_history', text: 'What is your work history?', placeholder: 'Previous roles, companies, industries...' },
      { id: 'work_enjoy', text: 'What do you enjoy most about your work?', placeholder: 'The aspects that energize you...' },
      { id: 'work_challenges', text: 'What challenges do you face at work?', placeholder: 'Difficulties, frustrations, obstacles...' },
      { id: 'work_schedule', text: 'What is your typical work schedule?', placeholder: 'Hours, remote/in-office, flexibility...' },
    ],
  },
  {
    id: 'hobbies',
    name: 'Hobbies',
    icon: 'Palette',
    description: 'Activities you enjoy in your free time',
    questions: [
      { id: 'hobbies_main', text: 'What are your main hobbies?', placeholder: 'e.g., Photography, hiking, playing guitar...' },
      { id: 'hobbies_frequency', text: 'How often do you engage in these hobbies?', placeholder: 'Daily, weekly, when you can...' },
      { id: 'hobbies_new', text: 'Are there hobbies you want to try?', placeholder: 'Activities you\'re curious about...' },
      { id: 'hobbies_history', text: 'What hobbies did you have growing up?', placeholder: 'Childhood interests and activities...' },
    ],
  },
  {
    id: 'friends',
    name: 'Friends',
    icon: 'Users',
    description: 'Your social circle and relationships',
    questions: [
      { id: 'friends_close', text: 'Tell me about your closest friends.', placeholder: 'Names, how you met, what they mean to you...' },
      { id: 'friends_activities', text: 'What do you usually do with friends?', placeholder: 'Common activities, traditions...' },
      { id: 'friends_frequency', text: 'How often do you see your friends?', placeholder: 'Weekly hangouts, occasional meetups...' },
      { id: 'friends_style', text: 'How would you describe your friendship style?', placeholder: 'Introvert/extrovert, small groups vs large...' },
    ],
  },
  {
    id: 'interesting_facts',
    name: 'Interesting Facts',
    icon: 'Sparkles',
    description: 'Unique things about you',
    questions: [
      { id: 'facts_surprising', text: 'What would people be surprised to learn about you?', placeholder: 'Hidden talents, unexpected interests...' },
      { id: 'facts_unique', text: 'What makes you unique?', placeholder: 'Unusual experiences, rare skills...' },
      { id: 'facts_stories', text: 'Do you have any interesting stories to share?', placeholder: 'Memorable experiences, adventures...' },
      { id: 'facts_trivia', text: 'Any fun trivia about yourself?', placeholder: 'Quirks, coincidences, fun facts...' },
    ],
  },
  {
    id: 'likes',
    name: 'Likes',
    icon: 'Heart',
    description: 'Things you enjoy and appreciate',
    questions: [
      { id: 'likes_food', text: 'What are your favorite foods and cuisines?', placeholder: 'Dishes, restaurants, cooking styles...' },
      { id: 'likes_entertainment', text: 'What entertainment do you enjoy?', placeholder: 'Movies, TV shows, music, books, games...' },
      { id: 'likes_places', text: 'What places do you love?', placeholder: 'Favorite spots, travel destinations...' },
      { id: 'likes_activities', text: 'What activities bring you joy?', placeholder: 'Things that make you happy...' },
      { id: 'likes_people', text: 'What qualities do you appreciate in people?', placeholder: 'Traits you admire in others...' },
    ],
  },
  {
    id: 'dislikes',
    name: 'Dislikes',
    icon: 'ThumbsDown',
    description: 'Things you prefer to avoid',
    questions: [
      { id: 'dislikes_food', text: 'What foods do you dislike?', placeholder: 'Foods or cuisines you avoid...' },
      { id: 'dislikes_pet_peeves', text: 'What are your pet peeves?', placeholder: 'Things that annoy or frustrate you...' },
      { id: 'dislikes_situations', text: 'What situations do you try to avoid?', placeholder: 'Uncomfortable scenarios...' },
      { id: 'dislikes_topics', text: 'Are there topics you prefer not to discuss?', placeholder: 'Sensitive or unpleasant subjects...' },
    ],
  },
  {
    id: 'political_opinions',
    name: 'Political Views',
    icon: 'Vote',
    description: 'Your stance on political matters',
    questions: [
      { id: 'political_leaning', text: 'How would you describe your political leaning?', placeholder: 'Conservative, liberal, moderate, libertarian...' },
      { id: 'political_issues', text: 'What political issues matter most to you?', placeholder: 'Key issues you care about...' },
      { id: 'political_involvement', text: 'How politically active are you?', placeholder: 'Voting, volunteering, activism...' },
      { id: 'political_discuss', text: 'How do you feel about discussing politics?', placeholder: 'Open to debate, prefer to avoid...' },
    ],
  },
  {
    id: 'spouse',
    name: 'Partner/Spouse',
    icon: 'HeartHandshake',
    description: 'Your romantic relationship',
    questions: [
      { id: 'spouse_status', text: 'What is your relationship status?', placeholder: 'Single, dating, married, etc...' },
      { id: 'spouse_about', text: 'Tell me about your partner (if applicable).', placeholder: 'Name, how you met, what they\'re like...' },
      { id: 'spouse_relationship', text: 'How would you describe your relationship?', placeholder: 'Dynamics, communication style, shared interests...' },
      { id: 'spouse_values', text: 'What do you value most in a relationship?', placeholder: 'Trust, communication, independence...' },
    ],
  },
  {
    id: 'children',
    name: 'Children',
    icon: 'Baby',
    description: 'Your family and parenting',
    questions: [
      { id: 'children_have', text: 'Do you have children?', placeholder: 'Names, ages, personalities...' },
      { id: 'children_parenting', text: 'What is your parenting style?', placeholder: 'Approach, values, priorities...' },
      { id: 'children_activities', text: 'What activities do you do with your children?', placeholder: 'Family traditions, outings, bonding...' },
      { id: 'children_future', text: 'What are your hopes for your children?', placeholder: 'Dreams, aspirations for them...' },
    ],
  },
  {
    id: 'worldview',
    name: 'Worldview',
    icon: 'Globe',
    description: 'Your philosophy and beliefs',
    questions: [
      { id: 'worldview_beliefs', text: 'What are your core beliefs about life?', placeholder: 'Philosophy, spirituality, meaning...' },
      { id: 'worldview_religion', text: 'What role does religion/spirituality play in your life?', placeholder: 'Faith, practices, importance...' },
      { id: 'worldview_values', text: 'What values guide your decisions?', placeholder: 'Principles you live by...' },
      { id: 'worldview_meaning', text: 'What gives your life meaning?', placeholder: 'Purpose, motivation, fulfillment...' },
    ],
  },
  {
    id: 'ambitions',
    name: 'Ambitions',
    icon: 'Target',
    description: 'Your goals and aspirations',
    questions: [
      { id: 'ambitions_short', text: 'What are your short-term goals?', placeholder: 'Goals for the next year or two...' },
      { id: 'ambitions_long', text: 'What are your long-term ambitions?', placeholder: 'Where do you see yourself in 10+ years...' },
      { id: 'ambitions_dreams', text: 'What dreams do you have?', placeholder: 'Big aspirations, bucket list items...' },
      { id: 'ambitions_obstacles', text: 'What obstacles stand in your way?', placeholder: 'Challenges to achieving your goals...' },
    ],
  },
  {
    id: 'accomplishments',
    name: 'Accomplishments',
    icon: 'Trophy',
    description: 'Your achievements and milestones',
    questions: [
      { id: 'accomplishments_proud', text: 'What accomplishments are you most proud of?', placeholder: 'Achievements that mean the most...' },
      { id: 'accomplishments_challenges', text: 'What challenges have you overcome?', placeholder: 'Difficult times you pushed through...' },
      { id: 'accomplishments_recent', text: 'What have you accomplished recently?', placeholder: 'Recent wins, big or small...' },
      { id: 'accomplishments_recognition', text: 'Have you received any awards or recognition?', placeholder: 'Formal or informal acknowledgment...' },
    ],
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'GraduationCap',
    description: 'Your learning journey',
    questions: [
      { id: 'education_formal', text: 'What is your educational background?', placeholder: 'Schools, degrees, certifications...' },
      { id: 'education_subjects', text: 'What subjects interest you?', placeholder: 'Topics you enjoy learning about...' },
      { id: 'education_learning', text: 'How do you prefer to learn?', placeholder: 'Books, videos, hands-on, courses...' },
      { id: 'education_current', text: 'Are you currently learning anything new?', placeholder: 'Current studies, skills being developed...' },
    ],
  },
]

export const getAllQuestionIds = (): string[] => {
  return categories.flatMap(cat => cat.questions.map(q => q.id))
}

export const getTotalQuestions = (): number => {
  return categories.reduce((sum, cat) => sum + cat.questions.length, 0)
}
