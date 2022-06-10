import React from "react";
import '../styles/loading.css'

export default function MessageBox({children, variant}) {
  return (
    <h2 className={`alert alert-${variant || 'info'}`}>
        {children}
    </h2>
  );
}
