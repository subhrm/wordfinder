import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
import { useState } from "react";

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
    const newChars = [...positionalChars];
    newChars[index] = value.toLowerCase();
    setPositionalChars(newChars);
  };

  const handlePositionalExcludeChange = (index: number, value: string) => {
    const newExcludes = [...positionalExcludes];
    newExcludes[index] = value.toLowerCase();
    setPositionalExcludes(newExcludes);
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
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Positional Characters</h3>
        <p className="text-sm text-muted-foreground">Specify characters that must exist at a given position.</p>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <Label htmlFor={`pos-${i}`}>Position {i + 1}</Label>
              <Input
                id={`pos-${i}`}
                maxLength={1}
                value={positionalChars[i]}
                className="size-16 text-center text-xl"
                onChange={(e) => handlePositionalCharChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <Separator /> */}

      <div>
        <h3 className="text-lg font-medium">Positional Exclusions</h3>
        <p className="text-sm text-muted-foreground">Specify characters that cannot exist at a given position.</p>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <Label htmlFor={`exclude-pos-${i}`}>Position {i + 1}</Label>
              <Input
                id={`exclude-pos-${i}`}
                value={positionalExcludes[i]}
                className="size-16 text-center text-xl"
                onChange={(e) => handlePositionalExcludeChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <Separator /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium">Global Inclusion</h3>
          <p className="text-sm text-muted-foreground">Characters that must appear somewhere in the word.</p>
          <Input
            value={globalIncludes}
            maxLength={5}
            onChange={(e) => setGlobalIncludes(e.target.value.toLowerCase())}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium">Global Exclusion</h3>
          <p className="text-sm text-muted-foreground">Characters that must not appear anywhere in the word.</p>
          <Input
            value={globalExcludes}
            maxLength={21}
            onChange={(e) => setGlobalExcludes(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      
      <p/>

      <div className="flex justify-center gap-12 h-32 m-12">
        <Button variant="outline" size="lg" className="text-4xl px-16 py-8 min-w-[220px] min-h-[80px]" onClick={handleClear}>
          Clear Filters
        </Button>
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white text-4xl px-20 py-8 min-w-[240px] min-h-[80px] flex items-center gap-4"
          onClick={handleSearch}
        >
          <FaSearch className="text-5xl text-white" style={{ filter: 'drop-shadow(0 0 2px #22c55e)' }} />
          Search
        </Button>
      </div>
    </div>
  );
}
