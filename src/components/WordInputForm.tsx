import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { Search, X, CaseSensitive, Ban } from "lucide-react";

interface WordInputFormProps {
  onSearch: (filters: any) => void;
  onClear: () => void;
}

export function WordInputForm({ onSearch, onClear }: WordInputFormProps) {
  const [positionalChars, setPositionalChars] = useState(Array(5).fill(""));
  const [positionalExcludes, setPositionalExcludes] = useState(Array(5).fill(""));
  const [globalIncludes, setGlobalIncludes] = useState("");
  const [globalExcludes, setGlobalExcludes] = useState("");

  const handlePositionalCharChange = (index: number, value: string) => {
    // Auto-advance focus logic could be added here later
    const newChars = [...positionalChars];
    newChars[index] = value.toLowerCase();
    setPositionalChars(newChars);

    // Auto-focus next input if value text
    if (value && index < 4) {
      const nextInput = document.getElementById(`pos-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>, type: 'include' | 'exclude') => {
    // Handle backspace to focus previous input
    if (e.key === 'Backspace' && !(type === 'include' ? positionalChars[index] : positionalExcludes[index]) && index > 0) {
      const prevInput = document.getElementById(`${type === 'include' ? 'pos' : 'exclude-pos'}-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePositionalExcludeChange = (index: number, value: string) => {
    const newExcludes = [...positionalExcludes];
    newExcludes[index] = value.toLowerCase();
    setPositionalExcludes(newExcludes);

    if (value && index < 4) {
      const nextInput = document.getElementById(`exclude-pos-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSearch = () => {
    onSearch({
      positionalChars,
      positionalExcludes,
      globalIncludes,
      globalExcludes,
    });
  };

  const handleClear = () => {
    setPositionalChars(Array(5).fill(""));
    setPositionalExcludes(Array(5).fill(""));
    setGlobalIncludes("");
    setGlobalExcludes("");
    onClear();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Positional Constraints Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
              <CaseSensitive className="w-5 h-5" />
              Positional Constraints
            </CardTitle>
            <CardDescription>
              Define what letters must or must not be in specific positions suitable for Wordle-like games.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Known Positions */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Known Letters (Green)</Label>
              <div className="grid grid-cols-5 gap-3 sm:gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={`pos-group-${i}`} className="relative group">
                    <Input
                      id={`pos-${i}`}
                      maxLength={1}
                      value={positionalChars[i]}
                      className="h-14 sm:h-16 text-center text-2xl sm:text-3xl font-bold uppercase bg-background/50 border-input transition-all focus:border-primary/50 focus:ring-primary/20 hover:border-primary/30"
                      onChange={(e) => handlePositionalCharChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e, 'include')}
                      placeholder="_"
                    />
                    <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-muted-foreground opacity-50">
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Excluded Positions */}
            <div className="space-y-3 pt-2">
              <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Excluded from Position (Yellow)</Label>
              <div className="grid grid-cols-5 gap-3 sm:gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={`exclude-group-${i}`}>
                    <Input
                      id={`exclude-pos-${i}`}
                      value={positionalExcludes[i]}
                      className="h-12 w-full text-center font-medium bg-background/50 border-input transition-all focus:border-yellow-500/50 focus:ring-yellow-500/20"
                      onChange={(e) => handlePositionalExcludeChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e, 'exclude')}
                      placeholder="Not..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Includes */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="w-5 h-5 text-green-500" />
              Must Contain
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={globalIncludes}
              placeholder="e.g. 'ae' (must have these letters)"
              className="h-12 text-lg tracking-wide bg-background/50"
              onChange={(e) => setGlobalIncludes(e.target.value.toLowerCase())}
            />
          </CardContent>
        </Card>

        {/* Global Excludes */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Ban className="w-5 h-5 text-red-500" />
              Must Not Contain
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={globalExcludes}
              placeholder="e.g. 'xyz' (ignore these)"
              className="h-12 text-lg tracking-wide bg-background/50"
              onChange={(e) => setGlobalExcludes(e.target.value.toLowerCase())}
            />
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handleClear}
          className="flex-1 h-14 text-base font-medium border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
        >
          <X className="mr-2 h-5 w-5" />
          Clear All
        </Button>
        <Button
          size="lg"
          className="flex-[2] h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          onClick={handleSearch}
        >
          <Search className="mr-2 h-5 w-5" />
          Find Words
        </Button>
      </div>
    </div>
  );
}
