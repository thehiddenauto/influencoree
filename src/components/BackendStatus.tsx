/**
 * Placeholder BackendStatus so preflight resolves "@/components/BackendStatus"
 * Replace with your real backend healthcheck UI later.
 */
import React from "react";

const BackendStatus: React.FC = () => {
  return (
    <div style={{display:"inline-block", padding:"6px", border:"1px solid rgba(0,0,0,0.08)"}}>
      <span style={{marginRight:8, color: "green"}}>●</span> Backend: Online — Uptime: N/A
    </div>
  );
};

export default BackendStatus;
