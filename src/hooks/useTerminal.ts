
import { useState, useCallback } from "react";
import { TerminalOutput } from "@/types/terminal";
import { processCommand } from "@/commands/commandProcessor";

const useTerminal = () => {
  const [output, setOutput] = useState<TerminalOutput[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  
  const handleCommandSubmit = useCallback(() => {
    if (!currentCommand.trim()) return;
    
    // Add command to history
    const newHistory = [...commandHistory, currentCommand];
    setCommandHistory(newHistory);
    setHistoryIndex(-1);
    
    // Handle clear command directly
    if (currentCommand.trim().toLowerCase() === "clear") {
      setOutput([]);
      setCurrentCommand("");
      return;
    }
    
    // Handle history command directly
    if (currentCommand.trim().toLowerCase() === "history") {
      const historyOutput = newHistory.map((cmd, i) => `${i + 1}  ${cmd}`);
      setOutput([
        ...output,
        {
          command: currentCommand,
          response: historyOutput
        }
      ]);
      setCurrentCommand("");
      return;
    }
    
    // Process other commands
    const result = processCommand(currentCommand);
    
    setOutput([
      ...output,
      {
        command: currentCommand,
        response: result.output,
        error: result.error,
        matrix: result.matrix
      }
    ]);
    
    setCurrentCommand("");
  }, [currentCommand, output, commandHistory]);
  
  const navigateHistory = useCallback((direction: number) => {
    if (commandHistory.length === 0) return;
    
    const newIndex = historyIndex + direction;
    
    if (newIndex >= commandHistory.length) {
      // Bottom of history, clear the command line
      setHistoryIndex(-1);
      setCurrentCommand("");
    } else if (newIndex >= 0) {
      // Valid history entry
      setHistoryIndex(newIndex);
      setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
    }
  }, [historyIndex, commandHistory]);
  
  return {
    output,
    currentCommand,
    setCurrentCommand,
    handleCommandSubmit,
    commandHistory,
    historyIndex,
    navigateHistory
  };
};

export default useTerminal;
