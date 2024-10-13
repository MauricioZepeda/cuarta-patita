import React from 'react'
import { Question } from '../../types'

interface DateQuestionProps {
  question: Question
  darkMode: boolean
  onChange: (value: string) => void
}

const DateQuestion: React.FC<DateQuestionProps> = ({ question, darkMode, onChange }) => {
  return (
    <input
      type="date"
      className={`mt-1 block w-full rounded-md ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'} shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
      required={question.required}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default DateQuestion