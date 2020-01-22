import React from 'react'
import JudgeApi from '../services/JudgeApi'

export default function SelectLang ({ onLangChange }) {
  return (
    <select onChange={onLangChange} className="bg-dark-btn">
      {JudgeApi.getLangs().map(l => <option value={l.id} key={l.id}>{l.name.split('(')[0]}</option>)}
    </select>
  )
}