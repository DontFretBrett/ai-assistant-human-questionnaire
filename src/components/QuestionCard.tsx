import { motion } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import type { Question } from '@/data/types'

interface QuestionCardProps {
  question: Question
  value: string
  onChange: (value: string) => void
  index: number
}

export function QuestionCard({ question, value, onChange, index }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <label className="block space-y-3">
            <span className="text-sm font-medium text-foreground leading-relaxed">
              {question.text}
            </span>
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.placeholder}
              className="min-h-[100px] transition-all focus:min-h-[140px]"
            />
          </label>
        </CardContent>
      </Card>
    </motion.div>
  )
}
