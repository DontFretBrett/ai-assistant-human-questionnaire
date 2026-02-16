import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { QuestionnaireData } from '@/data/types'
import {
  User,
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
  Bot,
  Smile,
  Shield,
  MessageCircle,
  Clock,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  User,
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
  Bot,
  Smile,
  Shield,
  MessageCircle,
  Clock,
  ShieldAlert,
}

export interface CategoryLike {
  id: string
  name: string
  icon: string
  description: string
  questions: Array<{ id: string }>
}

interface CategoryNavProps {
  categories: CategoryLike[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
  data: QuestionnaireData
}

export function CategoryNav({ categories, activeCategory, onCategoryChange, data }: CategoryNavProps) {
  const getCategoryProgress = (categoryId: string): number => {
    const category = categories.find(c => c.id === categoryId)
    if (!category) return 0

    const answered = category.questions.filter(q => data[q.id]?.trim()).length
    return (answered / category.questions.length) * 100
  }

  return (
    <nav className="w-full">
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-1.5 px-0.5">
        {categories.map((category) => {
          const Icon = iconMap[category.icon]
          const progress = getCategoryProgress(category.id)
          const isActive = activeCategory === category.id

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-md transition-colors w-full",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] leading-tight font-medium truncate w-full px-0.5 text-center">
                {category.name}
              </span>
              <div className="absolute bottom-0 left-0.5 right-0.5 h-0.5 bg-black/10 rounded-full overflow-hidden">
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
