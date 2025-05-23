
import { FileText, Folder, Settings, Monitor } from "lucide-react";

const DesktopIcons = () => {
  const icons = [
    { name: "Documents", icon: FileText },
    { name: "Projects", icon: Folder },
    { name: "Settings", icon: Settings },
    { name: "System", icon: Monitor },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 p-4">
      {icons.map((icon) => (
        <div 
          key={icon.name}
          className="flex flex-col items-center cursor-pointer group"
        >
          <div className="w-12 h-12 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <icon.icon className="h-6 w-6 text-white" />
          </div>
          <span className="mt-1 text-xs text-white bg-black/40 px-2 py-1 rounded-md">
            {icon.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons;
