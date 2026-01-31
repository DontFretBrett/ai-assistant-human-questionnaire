import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { categories, getTotalQuestions } from '@/data/questions'
import type { QuestionnaireData } from '@/data/types'

interface ProgressHeaderProps {
  data: QuestionnaireData
}

export function ProgressHeader({ data }: ProgressHeaderProps) {
  const totalQuestions = getTotalQuestions()
  const answeredQuestions = Object.values(data).filter(v => v?.trim()).length
  const progressPercent = (answeredQuestions / totalQuestions) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <motion.span
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Overall Progress
        </motion.span>
        <motion.span
          className="font-medium text-foreground"
          key={answeredQuestions}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {answeredQuestions} / {totalQuestions} questions
        </motion.span>
      </div>
      <Progress value={progressPercent} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{categories.length} categories</span>
        <span>{Math.round(progressPercent)}% complete</span>
      </div>
    </div>
  )
}
