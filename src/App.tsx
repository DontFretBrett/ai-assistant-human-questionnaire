import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useTheme } from '@/hooks/useTheme'
import { categories } from '@/data/questions'
import type { CategoryId, QuestionnaireData } from '@/data/types'
import { CategoryNav } from '@/components/CategoryNav'
import { QuestionCard } from '@/components/QuestionCard'
import { ProgressHeader } from '@/components/ProgressHeader'
import { ExportDialog } from '@/components/ExportDialog'
import { Disclaimer } from '@/components/Disclaimer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileDown, Sparkles, RotateCcw, ChevronRight, Check, Moon, Sun } from 'lucide-react'

function App() {
  const [data, setData] = useLocalStorage<QuestionnaireData>('questionnaire-data', {})
  const [activeCategory, setActiveCategory] = useState<CategoryId>('work')
  const [exportOpen, setExportOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const currentCategory = categories.find(c => c.id === activeCategory)

  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    setData(prev => ({
      ...prev,
      [questionId]: value,
    }))
  }, [setData])

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all your responses? This cannot be undone.')) {
      setData({})
    }
  }

  const handleNextCategory = () => {
    const currentIndex = categories.findIndex(c => c.id === activeCategory)
    if (currentIndex < categories.length - 1) {
      const nextCategory = categories[currentIndex + 1]
      setActiveCategory(nextCategory.id)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleDone = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isLastCategory = categories.findIndex(c => c.id === activeCategory) === categories.length - 1

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="flex flex-col items-center justify-center gap-4 relative">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <Sparkles className="w-8 h-8 text-primary flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">
                AI Assistant Human Questionnaire
              </h1>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-9 h-9"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help AI assistants understand you better by answering questions about yourself.
            Your responses are stored locally and can be exported as a document.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-4">
              <ProgressHeader data={data} />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <Button onClick={() => setExportOpen(true)} className="gap-2">
                  <FileDown className="w-4 h-4" />
                  Export for AI Assistant
                </Button>
                <Button variant="ghost" size="sm" onClick={handleReset} className="gap-2 text-muted-foreground">
                  <RotateCcw className="w-4 h-4" />
                  Reset All
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            data={data}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {currentCategory && (
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentCategory.name}
                  </CardTitle>
                  <CardDescription>
                    {currentCategory.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentCategory.questions.map((question, index) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      value={data[question.id] || ''}
                      onChange={(value) => handleAnswerChange(question.id, value)}
                      index={index}
                    />
                  ))}
                  {!isLastCategory ? (
                    <div className="pt-4 border-t">
                      <Button 
                        onClick={handleNextCategory}
                        className="w-full gap-2"
                        variant="default"
                      >
                        Next Category
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t">
                      <Button 
                        onClick={handleDone}
                        className="w-full gap-2"
                        variant="default"
                      >
                        Done
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <Disclaimer />

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted-foreground py-4"
        >
          <p className="text-center text-xs text-muted-foreground py-4">
            Made by <a href="https://www.brettsanders.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Brett Sanders</a> and his <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">OpenClaw</a> bot.
          </p>
          <p>
            AI Assistant Human Questionnaire - Your data stays on your device.
          </p>
        </motion.footer>
      </div>

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        data={data}
      />
    </div>
  )
}

export default App
