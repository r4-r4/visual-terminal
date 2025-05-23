
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface TerminalSettingsProps {
  className?: string;
}

const TerminalSettings = ({ className }: TerminalSettingsProps) => {
  const { toast } = useToast();
  const [fontFamily, setFontFamily] = useState<string>("mono");
  const [fontSize, setFontSize] = useState<number>(14);
  const [showAnimations, setShowAnimations] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  
  const handleSave = () => {
    // In a real app, we'd save these to localStorage or context
    toast({
      title: "Settings saved",
      description: "Your terminal preferences have been updated.",
    });
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={className}
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Open settings</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Terminal Settings</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="font-family">Font Family</Label>
            <RadioGroup 
              id="font-family" 
              value={fontFamily} 
              onValueChange={setFontFamily}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mono" id="mono" />
                <Label htmlFor="mono" className="font-mono">Monospace</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sans" id="sans" />
                <Label htmlFor="sans" className="font-sans">Sans-serif</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid gap-2">
            <Label>Font Size: {fontSize}px</Label>
            <Slider
              value={[fontSize]}
              min={10}
              max={24}
              step={1}
              onValueChange={([value]) => setFontSize(value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="animations">Show Animations</Label>
            <Switch
              id="animations"
              checked={showAnimations}
              onCheckedChange={setShowAnimations}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TerminalSettings;
