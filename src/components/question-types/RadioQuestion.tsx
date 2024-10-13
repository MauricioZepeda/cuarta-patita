import React from 'react'
import { Question } from '../../types'

interface RadioQuestionProps {
  question: Question
  darkMode: boolean
  onChange: (value: string) => void
}

const RadioQuestion: React.FC<RadioQuestionProps> = ({ question, darkMode, onChange }) => {
  return (
    <div className="mt-2 space-y-2">
      {question.options?.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            id={`radio-${question.id}-${index}`}
            type="radio"
            name={`radio-${question.id}`}
            value={option}
            className={`w-4 h-4 text-blue-600 ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-gray-100 border-gray-300'} focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2`}
            required={question.required}
            onChange={(e) => onChange(e.target.value)}
          />
          <label htmlFor={`radio-${question.id}-${index}`} className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}

export default RadioQuestion