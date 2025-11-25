import { cn } from './lib/utils'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Dodo Workplace</h1>
      <button
        className={cn(
          'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
          'bg-blue-600 hover:bg-blue-700 text-white',
          'shadow-lg hover:shadow-xl',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900'
        )}
        onClick={() => alert('Tailwind CSS is working!')}
      >
        Click Me
      </button>
      <p className="mt-6 text-slate-400 text-sm">
        Video conferencing powered by Agora
      </p>
    </div>
  )
}

export default App
