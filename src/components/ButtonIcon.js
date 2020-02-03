import React from 'react';

export default function ButtonIcon ({ bclx, iclx, txt, onClick, disabled }) {
  return (<button className={bclx || "btn"}
    onClick={() => { onClick() }}
    disabled={disabled || false}>
    <i className={iclx || "far fa-folder-open"}></i> {txt}
  </button>);
}