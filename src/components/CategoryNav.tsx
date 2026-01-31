import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { categories } from '@/data/questions'
import type { CategoryId, QuestionnaireData } from '@/data/types'
import {
  Briefcase,
  Palette,
  Users,
  Sparkles,
  Heart,
  ThumbsDown,
  Vote,
  HeartHandshake,
  Baby,
  Globe,
  Target,
  Trophy,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Palette,
  Users,
  Sparkles,
  Heart,
  ThumbsDown,
  Vote,
  HeartHandshake,
  Baby,
  Globe,
  Target,
  Trophy,
  GraduationCap,
}

interface CategoryNavProps {
  activeCategory: CategoryId
  onCategoryChange: (category: CategoryId) => void
  data: QuestionnaireData
}

export function CategoryNav({ activeCategory, onCategoryChange, data }: CategoryNavProps) {
  const getCategoryProgress = (categoryId: CategoryId): number => {
    const category = categories.find(c => c.id === categoryId)
    if (!category) return 0

    const answered = category.questions.filter(q => data[q.id]?.trim()).length
    return (answered / category.questions.length) * 100
  }

  return (
    <nav className="w-full overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max px-1">
        {categories.map((category) => {
          const Icon = iconMap[category.icon]
          const progress = getCategoryProgress(category.id)
          const isActive = activeCategory === category.id

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[80px]",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium truncate max-w-[70px]">
                {category.name}
              </span>
              <div className="absolute bottom-0 left-1 right-1 h-1 bg-black/10 rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    isActive ? "bg-primary-foreground/50" : "bg-primary/50"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
