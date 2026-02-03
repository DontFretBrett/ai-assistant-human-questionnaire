import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { categories } from '@/data/questions'
import type { QuestionnaireData } from '@/data/types'
import { Upload, Check, AlertCircle, FileText } from 'lucide-react'

interface ImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (data: QuestionnaireData) => void
}

// Create a map of question text to question ID for quick lookup (static, so module-level)
const questionTextToId = new Map<string, string>()
categories.forEach(category => {
  category.questions.forEach(question => {
    questionTextToId.set(question.text, question.id)
  })
})

export function ImportDialog({ open, onOpenChange, onImport }: ImportDialogProps) {
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [importedCount, setImportedCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Reset state when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      // Reset all state
      setImporting(false)
      setError(null)
      setSuccess(false)
      setImportedCount(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
    onOpenChange(newOpen)
  }

  const parseMarkdown = (markdown: string): QuestionnaireData => {
    const data: QuestionnaireData = {}
    const lines = markdown.split(/\r\n|\r|\n/)
    
    let currentQuestion: string | null = null
    let currentAnswer: string[] = []
    let inMetadataSection = false
    
    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i]
      const trimmedLine = rawLine.trim()
      
      // Check for metadata separator (---) - everything after this is metadata
      if (trimmedLine === '---') {
        // Save previous answer if exists before metadata
        if (currentQuestion && currentAnswer.length > 0) {
          const questionId = questionTextToId.get(currentQuestion)
          if (questionId) {
            const answer = currentAnswer.join('\n').replace(/^\s+|\s+$/g, '')
            if (answer) {
              data[questionId] = answer
            }
          }
          currentQuestion = null
          currentAnswer = []
        }
        inMetadataSection = true
        continue
      }
      
      // Skip metadata lines (only after --- separator)
      if (inMetadataSection && trimmedLine.startsWith('*')) {
        continue
      }
      
      // Check for headers first
      if (trimmedLine.startsWith('### ')) {
        // Save previous answer if exists
        if (currentQuestion && currentAnswer.length > 0) {
          const questionId = questionTextToId.get(currentQuestion)
          if (questionId) {
            // Join preserving empty lines, then trim only leading/trailing whitespace
            const answer = currentAnswer.join('\n').replace(/^\s+|\s+$/g, '')
            if (answer) {
              data[questionId] = answer
            }
          }
        }
        
        currentQuestion = trimmedLine.replace('### ', '').trim()
        currentAnswer = []
        continue
      }
      
      if (trimmedLine.startsWith('## ') && !trimmedLine.startsWith('###')) {
        // Save previous answer if exists
        if (currentQuestion && currentAnswer.length > 0) {
          const questionId = questionTextToId.get(currentQuestion)
          if (questionId) {
            const answer = currentAnswer.join('\n').replace(/^\s+|\s+$/g, '')
            if (answer) {
              data[questionId] = answer
            }
          }
        }
        
        currentQuestion = null
        currentAnswer = []
        continue
      }
      
      // Accumulate answer text (preserve empty lines within answers, including bullet points)
      if (currentQuestion && !inMetadataSection) {
        currentAnswer.push(rawLine)
      }
    }
    
    // Don't forget the last answer
    if (currentQuestion && currentAnswer.length > 0) {
      const questionId = questionTextToId.get(currentQuestion)
      if (questionId) {
        const answer = currentAnswer.join('\n').replace(/^\s+|\s+$/g, '')
        if (answer) {
          data[questionId] = answer
        }
      }
    }
    
    return data
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImporting(true)
    setError(null)
    setSuccess(false)
    setImportedCount(0)

    try {
      const text = await file.text()
      const importedData = parseMarkdown(text)
      
      const count = Object.keys(importedData).filter(key => importedData[key]?.trim()).length
      
      if (count === 0) {
        setError('No valid answers found in the file. Please check the file format.')
        setImporting(false)
        return
      }
      
      setImportedCount(count)
      setSuccess(true)
      
      // Wait a moment to show success, then import
      timeoutRef.current = setTimeout(() => {
          // Guard: only proceed if dialog is still open
        if (open) {
          onImport(importedData)
          setImporting(false)
          setSuccess(false)
          setImportedCount(0)
          handleOpenChange(false)
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        }
        timeoutRef.current = null
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import file. Please check the file format.')
      setImporting(false)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Import Questionnaire Data
          </DialogTitle>
          <DialogDescription>
            Import your previously exported questionnaire responses from a Markdown file.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.markdown,text/markdown"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Button
            onClick={handleClick}
            disabled={importing}
            className="w-full gap-2"
            variant="outline"
          >
            <Upload className="w-4 h-4" />
            {importing ? 'Importing...' : 'Select Markdown File'}
          </Button>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 flex items-start gap-2"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 flex items-start gap-2"
              >
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-600">
                  Successfully imported {importedCount} {importedCount === 1 ? 'answer' : 'answers'}!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="rounded-lg bg-muted p-4 space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Import Format:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Select a Markdown (.md) file previously exported from this app</li>
              <li>Answers will be matched to questions by their text</li>
              <li>Existing answers will be replaced with imported data</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
