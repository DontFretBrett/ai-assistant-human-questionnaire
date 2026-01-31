import { motion } from 'framer-motion'
import { Shield, Lock } from 'lucide-react'

export function Disclaimer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl border border-border bg-card/50 p-4 space-y-3"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-sm">Your Privacy Matters</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All your responses are stored <strong>locally in your browser</strong> using localStorage.
            We do not collect, transmit, or store any of your data on external servers.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-sm">You Control Your Data</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Export your data anytime as a Markdown file. Clear your browser data to remove everything.
            Your information never leaves your device unless you explicitly share it.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
