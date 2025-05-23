
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TerminalOutputProps {
  command: string;
  response?: string[];
  error?: boolean;
  matrix?: boolean;
}

const TerminalOutput = ({ command, response, error, matrix }: TerminalOutputProps) => {
  // Check if response contains ASCII art (like neofetch output or blackiris)
  const containsAsciiArt = response?.some(line => 
    line.includes("@web-terminal") || 
    line.includes("-+ssssssss") || 
    line.includes("\\   ^__^") ||
    line.includes("000000") // Check for blackiris art
  );
  
  // State for matrix animation
  const [matrixLines, setMatrixLines] = useState<string[]>(response || []);
  const [animationActive, setAnimationActive] = useState(false);
  
  // Determine if this is a sudo command
  const isSudoCommand = command.trim().toLowerCase().startsWith("sudo ");
  
  // Handle matrix animation
  useEffect(() => {
    if (matrix && response) {
      setAnimationActive(true);
      
      // Create rain drops for matrix effect (positions of active drops)
      const screenWidth = 80;
      let rainDrops: number[] = [];
      
      // Initialize some rain drops at random positions
      for (let i = 0; i < screenWidth / 4; i++) {
        rainDrops.push(Math.floor(Math.random() * screenWidth));
      }
      
      // Start animation
      const intervalId = setInterval(() => {
        setMatrixLines(prevLines => {
          // Don't modify instructions at the bottom
          const contentLines = prevLines.slice(0, prevLines.length - 2);
          const instructionLines = prevLines.slice(prevLines.length - 2);
          
          // Create a new set of lines
          const newContentLines = [...contentLines];
          
          // Process each rain drop
          rainDrops = rainDrops.map(pos => {
            // Add new character at the rain position
            for (let i = 0; i < contentLines.length; i++) {
              const line = newContentLines[i];
              const chars = line.split('');
              
              // Determine if this is the head of the drop (brighter)
              if (i === 0) {
                // Bright head of the drop - always a new character
                const charSet = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,./<>?";
                chars[pos] = charSet[Math.floor(Math.random() * charSet.length)];
                newContentLines[i] = chars.join('');
              } else {
                // Trailing part of the drop - update with small probability
                if (chars[pos] !== ' ' && Math.random() < 0.3) {
                  const charSet = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,./<>?";
                  chars[pos] = charSet[Math.floor(Math.random() * charSet.length)];
                  newContentLines[i] = chars.join('');
                }
              }
            }
            
            // Randomly change drop position or create new ones
            if (Math.random() < 0.02) {
              // Move to a new position
              return Math.floor(Math.random() * screenWidth);
            }
            
            return pos;
          });
          
          // Sometimes add new drops
          if (Math.random() < 0.2) {
            rainDrops.push(Math.floor(Math.random() * screenWidth));
          }
          
          // Keep total drops within reasonable limits
          if (rainDrops.length > screenWidth / 2) {
            rainDrops = rainDrops.slice(0, Math.floor(screenWidth / 2));
          }
          
          // Shift all lines up to create the rain effect
          const firstLine = newContentLines.shift() || '';
          
          // Create a new bottom line with sparse characters
          let newLine = "";
          for (let i = 0; i < screenWidth; i++) {
            if (rainDrops.includes(i)) {
              const charSet = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,./<>?";
              newLine += charSet[Math.floor(Math.random() * charSet.length)];
            } else {
              newLine += " ";
            }
          }
          
          newContentLines.push(newLine);
          return [...newContentLines, ...instructionLines];
        });
      }, 150);
      
      // Add event listener to stop animation on any key press
      const handleKeyPress = () => {
        clearInterval(intervalId);
        setAnimationActive(false);
      };
      
      document.addEventListener('keydown', handleKeyPress);
      
      // Clean up
      return () => {
        clearInterval(intervalId);
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [matrix, response]);
  
  return (
    <div className="mb-2">
      <div className="flex">
        <span className={cn("mr-2", isSudoCommand ? "text-terminal-red" : "text-terminal-green")}>
          {isSudoCommand ? "#" : "$"}
        </span>
        <span className="text-terminal-text">{command}</span>
      </div>
      
      {response && (
        <div className={containsAsciiArt ? "font-mono text-xs" : ""}>
          {(matrix ? matrixLines : response).map((line, i) => (
            <p 
              key={i} 
              className={cn(
                "ml-4", 
                containsAsciiArt ? "whitespace-pre" : "whitespace-pre-wrap", 
                error ? "text-terminal-red" : 
                  matrix ? (i === 0 ? "text-terminal-bright-green" : "text-terminal-green") + " whitespace-pre" : "text-terminal-text",
                // Make password prompt line stand out
                line === "[sudo] password for user: " ? "text-terminal-yellow" : "",
                // Make blackiris command output use smaller font for better display
                command.trim() === "blackiris" ? "text-[0.5rem] leading-[0.6rem]" : ""
              )}
            >
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TerminalOutput;
