import React from 'react';

export default function Preview ({ preview, isRunning }) {
  return (
    <div className="prev-box">
      {isRunning ? <div style={{ color: '#2196f3' }}>Running code...</div> : ''}
      {preview && <div style={{ color: '#5cb85c' }}>Finished in {preview.time} ms</div>}
      {preview && <div>{preview.stdout && preview.stdout.split(/\n|\r\n/).map((v, i) => <div className="output" key={v + i}>{v}</div>)}</div>}
      <div style={{ color: '#e40000' }}>{preview.stderr}</div>
    </div>
  )
}