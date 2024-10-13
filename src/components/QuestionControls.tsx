import React from 'react'
import { Edit, ArrowUp, ArrowDown, Trash2 } from 'lucide-react'

interface QuestionControlsProps {
  index: number
  totalQuestions: number
  onEditQuestion: () => void
  onMoveQuestion: (direction: 'up' | 'down') => void
  onDeleteQuestion: () => void
  darkMode: boolean
}

const QuestionControls: React.FC<QuestionControlsProps> = ({
  index,
  totalQuestions,
  onEditQuestion,
  onMoveQuestion,
  onDeleteQuestion,
  darkMode
}) => {
  return (
    <div className="flex space-x-2">
      <button
        type="button"
        onClick={() => onMoveQuestion('up')}
        className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={index === 0}
      >
        <ArrowUp size={20} />
      </button>
      <button
        type="button"
        onClick={() => onMoveQuestion('down')}
        className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={index === totalQuestions - 1}
      >
        <ArrowDown size={20} />
      </button>
      <button
        type="button"
        onClick={onEditQuestion}
        className="text-blue-500 hover:text-blue-700"
      >
        <Edit size={20} />
      </button>
      <button
        type="button"
        onClick={onDeleteQuestion}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}

export default QuestionControls