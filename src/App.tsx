import { useEffect, useState } from "react";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { WordInputForm } from "@/components/WordInputForm";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Gamepad2 } from "lucide-react";

const WORD_LIST_URL = "https://gist.githubusercontent.com/subhrm/5362767af06597bd1e216c59b760f6cb/raw/6bfa15d263d6d5b63840a8e5b64e04b382fdb079/valid-wordle-words.txt";

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [filteredWords, setFilteredWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(WORD_LIST_URL);
        if (!response.ok) {
          throw new Error("Failed to load word list.");
        }
        const text = await response.text();
        const wordList = text.split("\n").filter((word) => word.length === 5);
        setWords(wordList);
        setFilteredWords(wordList);
      } catch (err) {
        setError("Failed to load word list. Please check your internet connection or try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWords();
  }, []);

  const handleSearch = (filters: any) => {
    let newFilteredWords = [...words];

    // Positional Character Filters
    filters.positionalChars.forEach((char: string, index: number) => {
      if (char) {
        newFilteredWords = newFilteredWords.filter((word) => word[index] === char);
      }
    });

    // Positional Exclusion Filters
    filters.positionalExcludes.forEach((excludeChars: string, index: number) => {
      if (excludeChars) {
        const excludeArr = excludeChars.split("");
        newFilteredWords = newFilteredWords.filter((word) => !excludeArr.includes(word[index]));
      }
    });

    // Global Inclusion Filter
    if (filters.globalIncludes) {
      const includeArr = filters.globalIncludes.split("");
      newFilteredWords = newFilteredWords.filter((word) =>
        includeArr.every((char: string) => word.includes(char))
      );
    }

    // Global Exclusion Filter
    if (filters.globalExcludes) {
      const excludeArr = filters.globalExcludes.split("");
      newFilteredWords = newFilteredWords.filter(
        (word) => !excludeArr.some((char: string) => word.includes(char))
      );
    }

    setFilteredWords(newFilteredWords);
  };

  const handleClear = () => {
    setFilteredWords(words);
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background p-4 md:p-8">
        <div className="container mx-auto max-w-5xl space-y-8">
          <header className="relative flex flex-col items-center justify-center space-y-4 pt-8 pb-4">
            <div className="absolute right-0 top-4 md:top-8">
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-full ring-1 ring-primary/20">
              <Gamepad2 className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-foreground">
                WordFinder
              </h1>
              <p className="text-muted-foreground text-lg max-w-[600px]">
                Find the perfect word with this powerful constraint solver.
              </p>
            </div>
          </header>

          <main className="space-y-8">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-64 space-y-4">
                <LoadingIndicator />
                <p className="text-muted-foreground animate-pulse">Loading dictionary...</p>
              </div>
            ) : error ? (
              <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10 text-destructive text-center">
                {error}
              </div>
            ) : (
              <>
                <WordInputForm onSearch={handleSearch} onClear={handleClear} />
                <ResultsDisplay words={filteredWords} />
              </>
            )}
          </main>

          <footer className="text-center text-sm text-muted-foreground py-8">
            <p>© {new Date().getFullYear()}  WordFinder. Built with React, Vite and TailwindCSS</p>
            <p>Created by <a href="https://github.com/subhrm" target="_blank" rel="noopener noreferrer">@subhrm</a></p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
