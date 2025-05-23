
import { useEffect, useRef } from "react";
import useTerminal from "@/hooks/useTerminal";
import { cn } from "@/lib/utils";
import TerminalInput from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";

interface TerminalProps {
  className?: string;
}

const Terminal = ({ className }: TerminalProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { 
    output, 
    currentCommand, 
    setCurrentCommand, 
    handleCommandSubmit,
    navigateHistory
  } = useTerminal();

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory(1);
    }
  };

  return (
    <div 
      className={cn(
        "bg-terminal-bg text-terminal-text w-full h-full rounded-b-md overflow-hidden flex flex-col",
        className
      )}
    >  
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm"
      >
        <div className="space-y-1">
          <p className="text-terminal-green font-bold">
            Web Terminal v1.0 - Welcome to the desktop environment!
          </p>
          <p className="text-terminal-text opacity-90 mb-4">
            Type 'help' to see available commands.
          </p>
          
          {output.map((item, index) => (
            <TerminalOutput 
              key={index} 
              command={item.command} 
              response={item.response} 
              error={item.error}
              matrix={item.matrix}
            />
          ))}
        </div>
        
        <TerminalInput 
          value={currentCommand} 
          onChange={(e) => setCurrentCommand(e.target.value)}
          onSubmit={handleCommandSubmit}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Terminal;
