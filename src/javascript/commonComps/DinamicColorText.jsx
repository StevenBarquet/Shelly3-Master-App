// ---Dependencys
import React from 'react';

// ------------------------------------------ COMPONENT-----------------------------------------
function DinamicColorText(props) {
  const { text, textColor } = props;
  // ----------------------- Metodos Principales
  // ----------------------- Metodos Auxiliares
  return <span style={{ color: textColor }}>{text}</span>;
}

export default DinamicColorText;
