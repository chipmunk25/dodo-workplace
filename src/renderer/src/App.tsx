import { ChatWindow } from './components/chat'

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="h-screen w-screen bg-gray-100">
      <ChatWindow />
    </div>
  )
}

export default App
