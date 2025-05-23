
import { useEffect, useRef } from "react";

interface TerminalInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TerminalInput = ({ value, onChange, onSubmit, onKeyDown }: TerminalInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
    onKeyDown(e);
  };
  
  return (
    <div className="flex items-center mt-2">
      <span className="text-terminal-green mr-2">$</span>
      <input
        ref={inputRef}
        type="text"
        className="bg-transparent border-none outline-none flex-1 text-terminal-text font-mono"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyPress}
        autoFocus
        spellCheck="false"
        autoComplete="off"
      />
      <span className="w-2 h-5 bg-terminal-text animate-cursor-blink"></span>
    </div>
  );
};

export default TerminalInput;
