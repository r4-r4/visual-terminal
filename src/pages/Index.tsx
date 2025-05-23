
import Terminal from "@/components/Terminal";
import TerminalSettings from "@/components/TerminalSettings";
import DesktopIcons from "@/components/DesktopIcons";
import Taskbar from "@/components/Taskbar";
import { useState } from "react";

const Index = () => {
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex flex-col">
      {/* Desktop area */}
      <div className="flex-1 p-4 sm:p-6 relative">
        <DesktopIcons />
        
        {/* Terminal window */}
        {!terminalMinimized && (
          <div className="absolute inset-8 bg-gray-800 rounded-md overflow-hidden shadow-xl border border-gray-700 flex flex-col">
            <div className="bg-terminal-blue py-2 px-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                <div 
                  className="w-3 h-3 rounded-full bg-terminal-green cursor-pointer"
                  onClick={() => setTerminalMinimized(true)}
                ></div>
              </div>
              <div className="text-sm font-mono text-white opacity-70">Terminal - user@web-terminal:~</div>
              <div>
                <TerminalSettings className="text-white" />
              </div>
            </div>
            
            <Terminal className="h-full" />
          </div>
        )}
      </div>
      
      {/* Taskbar */}
      <Taskbar 
        terminalMinimized={terminalMinimized} 
        onTerminalClick={() => setTerminalMinimized(false)}
      />
    </div>
  );
};

export default Index;
