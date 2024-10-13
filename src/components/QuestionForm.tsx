import React, { useState, useEffect } from 'react'
import { Question } from '../types'
import { PlusCircle, X, ArrowUp, ArrowDown } from 'lucide-react'

interface QuestionFormProps {
  onAddQuestion: (question: Question) => void
  editingQuestion: Question | null
  onCancelEdit: () => void
  darkMode: boolean
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onAddQuestion, editingQuestion, onCancelEdit, darkMode }) => {
  const [question, setQuestion] = useState<Question>(createEmptyQuestion())
  const [newOption, setNewOption] = useState('')

  useEffect(() => {
    setQuestion(editingQuestion || createEmptyQuestion())
  }, [editingQuestion])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.text.trim()) {
      onAddQuestion(question)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setQuestion(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleOptionActions = {
    add: () => {
      if (newOption.trim()) {
        setQuestion(prev => ({
          ...prev,
          options: [...(prev.options || []), newOption.trim()]
        }))
        setNewOption('')
      }
    },
    remove: (index: number) => {
      setQuestion(prev => ({
        ...prev,
        options: prev.options?.filter((_, i) => i !== index)
      }))
    },
    move: (index: number, direction: 'up' | 'down') => {
      const newOptions = [...(question.options || [])]
      const newIndex = direction === 'up' ? index - 1 : index + 1
      if (newIndex >= 0 && newIndex < newOptions.length) {
        [newOptions[index], newOptions[newIndex]] = [newOptions[newIndex], newOptions[index]]
        setQuestion(prev => ({ ...prev, options: newOptions }))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderTextInput('text', 'Texto de la Pregunta', question.text, handleInputChange, darkMode)}
      {renderSelectInput('type', 'Tipo de Respuesta', question.type, handleInputChange, darkMode)}
      {renderCheckbox('required', 'Campo Obligatorio', question.required, handleInputChange, darkMode)}
      {(question.type === 'select' || question.type === 'radio') && renderOptionsSection(darkMode)}
      {renderFormButtons(darkMode)}
    </form>
  )

  function renderTextInput(name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, darkMode: boolean) {
    return (
      <div className="transition-all duration-300 ease-in-out">
        <label htmlFor={name} className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
          {label}
        </label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
          required
        />
      </div>
    )
  }

  function renderSelectInput(name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, darkMode: boolean) {
    const options = [
      { value: 'text', label: 'Texto' },
      { value: 'number', label: 'Número' },
      { value: 'date', label: 'Fecha' },
      { value: 'select', label: 'Selección' },
      { value: 'switch', label: 'Switch' },
      { value: 'radio', label: 'Radio Button' },
      { value: 'paragraph', label: 'Párrafo' }
    ]

    return (
      <div className="transition-all duration-300 ease-in-out">
        <label htmlFor={name} className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    )
  }

  function renderCheckbox(name: string, label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, darkMode: boolean) {
    return (
      <div className="flex items-center transition-all duration-300 ease-in-out">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className={`h-4 w-4 text-blue-600 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} rounded transition-all duration-200`}
        />
        <label htmlFor={name} className={`ml-2 block text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
          {label}
        </label>
      </div>
    )
  }

  function renderOptionsSection(darkMode: boolean) {
    return (
      <div className="space-y-2 transition-all duration-300 ease-in-out">
        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Opciones</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            className={`flex-grow px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
            placeholder="Nueva opción"
          />
          <button
            type="button"
            onClick={handleOptionActions.add}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Agregar
          </button>
        </div>
        <ul className={`space-y-2 max-h-40 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-md p-2`}>
          {question.options?.map((option, index) => (
            <li key={index} className={`flex items-center justify-between ${darkMode ? 'bg-gray-700' : 'bg-white'} px-3 py-2 rounded-md transition-all duration-200 hover:bg-opacity-80`}>
              <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>{option}</span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleOptionActions.move(index, 'up')}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors duration-200`}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionActions.move(index, 'down')}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors duration-200`}
                  disabled={index === question.options!.length - 1}
                >
                  <ArrowDown className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionActions.remove(index)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  function renderFormButtons(darkMode: boolean) {
    return (
      <div className="flex space-x-2 pt-4">
        <button
          type="submit"
          className="flex-grow bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          {editingQuestion ? 'Guardar Cambios' : 'Agregar Pregunta'}
        </button>
        <button
          type="button"
          onClick={onCancelEdit}
          className={`${darkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200`}
        >
          Cancelar
        </button>
      </div>
    )
  }
}

function createEmptyQuestion(): Question {
  return {
    id: Date.now(),
    text: '',
    type: 'text',
    options: [],
    required: false,
  }
}

export default QuestionForm