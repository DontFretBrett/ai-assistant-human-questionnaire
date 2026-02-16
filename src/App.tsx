import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useTheme } from '@/hooks/useTheme'
import { categories, getTotalQuestions } from '@/data/questions'
import { agentCategories, getTotalAgentQuestions } from '@/data/agentQuestions'
import type { QuestionnaireData, QuestionnaireMode } from '@/data/types'
import { CategoryNav } from '@/components/CategoryNav'
import { QuestionCard } from '@/components/QuestionCard'
import { ProgressHeader } from '@/components/ProgressHeader'
import { ExportDialog } from '@/components/ExportDialog'
import { ImportDialog } from '@/components/ImportDialog'
import { Disclaimer } from '@/components/Disclaimer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileDown, FileUp, Sparkles, RotateCcw, ChevronRight, Check, Moon, Sun, User, Bot } from 'lucide-react'

function App() {
  const [mode, setMode] = useState<QuestionnaireMode>('human')
  const [humanData, setHumanData] = useLocalStorage<QuestionnaireData>('questionnaire-data', {})
  const [agentData, setAgentData] = useLocalStorage<QuestionnaireData>('agent-questionnaire-data', {})
  const [activeCategory, setActiveCategory] = useState<string>('basics')
  const [exportOpen, setExportOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const categoriesList = mode === 'human' ? categories : agentCategories
  const data = mode === 'human' ? humanData : agentData
  const setData = mode === 'human' ? setHumanData : setAgentData
  const totalQuestions = mode === 'human' ? getTotalQuestions() : getTotalAgentQuestions()

  const handleModeChange = (value: string) => {
    const newMode = value as QuestionnaireMode
    setMode(newMode)
    const newCategories = newMode === 'human' ? categories : agentCategories
    setActiveCategory(newCategories[0].id)
  }

  const currentCategory = categoriesList.find(c => c.id === activeCategory)

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

  const handleImport = (importedData: QuestionnaireData) => {
    setData(prev => ({
      ...prev,
      ...importedData,
    }))
  }

  const handleNextCategory = () => {
    const currentIndex = categoriesList.findIndex(c => c.id === activeCategory)
    if (currentIndex < categoriesList.length - 1) {
      const nextCategory = categoriesList[currentIndex + 1]
      setActiveCategory(nextCategory.id)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleDone = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isLastCategory = categoriesList.findIndex(c => c.id === activeCategory) === categoriesList.length - 1

  const headerTitle = mode === 'human' ? 'AI Assistant Human Questionnaire' : 'AI Assistant Agent Questionnaire'
  const headerSubtitle = mode === 'human'
    ? 'Help AI assistants understand you better by answering questions about yourself.'
    : "Define your agent's personality, goals, and behavior. Compatible with OpenClaw and similar frameworks."

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
                {headerTitle}
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
            {headerSubtitle}
            {' '}Your responses are only stored in your browser and can be exported or imported as a document.
          </p>

          <Tabs value={mode} onValueChange={handleModeChange} className="w-full max-w-md mx-auto pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="human" className="gap-2">
                <User className="w-4 h-4" />
                Define Human
              </TabsTrigger>
              <TabsTrigger value="agent" className="gap-2">
                <Bot className="w-4 h-4" />
                Define Agent
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-4">
              <ProgressHeader
                data={data}
                totalQuestions={totalQuestions}
                categoryCount={categoriesList.length}
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setImportOpen(true)} variant="outline" className="gap-2">
                    <FileUp className="w-4 h-4" />
                    Import
                  </Button>
                  <Button onClick={() => setExportOpen(true)} className="gap-2">
                    <FileDown className="w-4 h-4" />
                    Export
                  </Button>
                </div>
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
            categories={categoriesList}
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
                        onMouseDown={handleNextCategory}
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
                        onMouseDown={handleDone}
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
          <div className="flex flex-wrap gap-4 items-center justify-center pt-4 border-t border-border/50">
            <a 
              href="https://github.com/DontFretBrett/ai-assistant-human-questionnaire" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub Repo
            </a>
            <p className="text-muted-foreground">
              AI Assistant Questionnaire - Your data stays on your device.
            </p>
          </div>
        </motion.footer>
      </div>

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        data={data}
        mode={mode}
        categories={categoriesList}
      />

      <ImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        onImport={handleImport}
        categories={categoriesList}
      />
    </div>
  )
}

export default App
