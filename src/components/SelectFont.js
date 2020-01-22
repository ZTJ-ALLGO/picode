import React from 'react';

const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '22px'];

export default function SelectFont ({ onFontSizeChange, fontSize }) {

  return (
    <select onChange={onFontSizeChange} value={fontSize} className="bg-dark-btn">
      {fontSizes.map(f => <option value={f} key={f}>{f}</option>)}
    </select>
  )
}
