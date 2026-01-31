import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { categories } from '@/data/questions'
import type { CategoryId, QuestionnaireData } from '@/data/types'
import { CategoryNav } from '@/components/CategoryNav'
import { QuestionCard } from '@/components/QuestionCard'
import { ProgressHeader } from '@/components/ProgressHeader'
import { ExportDialog } from '@/components/ExportDialog'
import { Disclaimer } from '@/components/Disclaimer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileDown, Sparkles, RotateCcw } from 'lucide-react'

function App() {
  const [data, setData] = useLocalStorage<QuestionnaireData>('questionnaire-data', {})
  const [activeCategory, setActiveCategory] = useState<CategoryId>('work')
  const [exportOpen, setExportOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">
              AI Assistant Human Questionnaire
            </h1>
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
