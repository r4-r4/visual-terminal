
import { Clock } from "@/components/Clock";
import { Terminal as TerminalIcon } from "lucide-react";

interface TaskbarProps {
  terminalMinimized: boolean;
  onTerminalClick: () => void;
}

const Taskbar = ({ terminalMinimized, onTerminalClick }: TaskbarProps) => {
  return (
    <div className="h-14 bg-black/60 backdrop-blur-md border-t border-white/10 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {/* Start menu */}
        <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xl">L</span>
        </button>
        
        {/* Terminal icon */}
        <button 
          onClick={onTerminalClick}
          className={`h-10 px-4 flex items-center space-x-2 rounded ${
            terminalMinimized ? 'bg-transparent hover:bg-white/10' : 'bg-white/20'
          }`}
        >
          <TerminalIcon className="h-5 w-5 text-white" />
          <span className="text-white text-sm">Terminal</span>
        </button>
      </div>
      
      {/* Right side: time */}
      <Clock />
    </div>
  );
};

export default Taskbar;
