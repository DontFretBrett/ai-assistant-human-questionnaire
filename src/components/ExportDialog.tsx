import { useState } from 'react'
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
import { Download, Copy, Check, FileText } from 'lucide-react'

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: QuestionnaireData
}

export function ExportDialog({ open, onOpenChange, data }: ExportDialogProps) {
  const [copied, setCopied] = useState(false)

  const generateMarkdown = (): string => {
    const lines: string[] = [
      '# About Me - AI Assistant Context',
      '',
      '*This document was generated to help AI assistants understand who I am and provide more personalized assistance.*',
      '',
    ]

    for (const category of categories) {
      const answeredQuestions = category.questions.filter(q => data[q.id]?.trim())

      if (answeredQuestions.length === 0) continue

      lines.push(`## ${category.name}`)
      lines.push('')

      for (const question of answeredQuestions) {
        const answer = data[question.id]?.trim()
        if (answer) {
          lines.push(`### ${question.text}`)
          lines.push('')
          lines.push(answer)
          lines.push('')
        }
      }
    }

    lines.push('---')
    lines.push('')
    lines.push(`*Generated on ${new Date().toLocaleDateString()}*`)

    return lines.join('\n')
  }

  const handleCopy = async () => {
    const markdown = generateMarkdown()
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const markdown = generateMarkdown()
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'about-me-ai-context.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const answeredCount = Object.values(data).filter(v => v?.trim()).length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Export for AI Assistant
          </DialogTitle>
          <DialogDescription>
            Export your questionnaire responses as a Markdown document that you can share with AI assistants for better personalization.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-muted p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Questions answered</span>
              <span className="font-medium">{answeredCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Categories covered</span>
              <span className="font-medium">
                {categories.filter(c => c.questions.some(q => data[q.id]?.trim())).length} / {categories.length}
              </span>
            </div>
          </div>

          {answeredCount === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive mt-3"
            >
              Please answer at least one question before exporting.
            </motion.p>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={answeredCount === 0}
            className="gap-2"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            onClick={handleDownload}
            disabled={answeredCount === 0}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download .md
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
