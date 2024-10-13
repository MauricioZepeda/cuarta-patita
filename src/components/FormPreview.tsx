import React, { useState } from 'react'
import { Question } from '../types'
import QuestionControls from './QuestionControls'
import TextQuestion from './question-types/TextQuestion'
import NumberQuestion from './question-types/NumberQuestion'
import DateQuestion from './question-types/DateQuestion'
import SelectQuestion from './question-types/SelectQuestion'
import SwitchQuestion from './question-types/SwitchQuestion'
import RadioQuestion from './question-types/RadioQuestion'
import ParagraphQuestion from './question-types/ParagraphQuestion'

interface FormPreviewProps {
  questions: Question[]
  onEditQuestion: (question: Question) => void
  onMoveQuestion: (index: number, direction: 'up' | 'down') => void
  onDeleteQuestion: (questionId: number) => void
  onValidateForm: (responses: Record<string, string>) => void
  darkMode: boolean
}

const FormPreview: React.FC<FormPreviewProps> = ({ 
  questions, 
  onEditQuestion, 
  onMoveQuestion, 
  onDeleteQuestion,
  onValidateForm,
  darkMode
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({})

  const handleInputChange = (questionId: number, value: string) => {
    setResponses(prev => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onValidateForm(responses)
  }

  const renderQuestionByType = (question: Question) => {
    const props = {
      question,
      darkMode,
      onChange: (value: string) => handleInputChange(question.id, value)
    }

    switch (question.type) {
      case 'text':
        return <TextQuestion {...props} />
      case 'number':
        return <NumberQuestion {...props} />
      case 'date':
        return <DateQuestion {...props} />
      case 'select':
        return <SelectQuestion {...props} />
      case 'switch':
        return <SwitchQuestion {...props} />
      case 'radio':
        return <RadioQuestion {...props} />
      case 'paragraph':
        return <ParagraphQuestion {...props} />
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((question, index) => (
        <div key={question.id} className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden`}>
          <div className={`${darkMode ? 'bg-gray-600' : 'bg-gray-50'} px-4 py-1 border-b ${darkMode ? 'border-gray-500' : 'border-gray-200'} flex justify-between items-center`}>
            <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pregunta {index + 1}</h3>
            <QuestionControls
              index={index}
              totalQuestions={questions.length}
              onEditQuestion={() => onEditQuestion(question)}
              onMoveQuestion={(direction) => onMoveQuestion(index, direction)}
              onDeleteQuestion={() => onDeleteQuestion(question.id)}
              darkMode={darkMode}
            />
          </div>
          <div className="px-4 py-5 sm:p-6">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
              {question.text}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderQuestionByType(question)}
          </div>
        </div>
      ))}
      
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Ver respuestas
        </button>
      </div>
    </form>
  )
}

export default FormPreview