import { Smile } from 'lucide-react'
import { cn } from './lib/utils'

function App() {
  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-blue-500 to-purple-600",
      "flex flex-col items-center justify-center"
    )}>
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Smile className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Hello World
        </h1>
        <p className="text-xl text-white/80">
          Welcome to Dodo Workplace
        </p>
      </div>
    </div>
  )
}

export default App
