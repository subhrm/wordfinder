import { useEffect, useState } from "react";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { WordInputForm } from "@/components/WordInputForm";

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
        includeArr.every((char) => word.includes(char))
      );
    }

    // Global Exclusion Filter
    if (filters.globalExcludes) {
      const excludeArr = filters.globalExcludes.split("");
      newFilteredWords = newFilteredWords.filter(
        (word) => !excludeArr.some((char) => word.includes(char))
      );
    }

    setFilteredWords(newFilteredWords);
  };

  const handleClear = () => {
    setFilteredWords(words);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">WordFinder</h1>
      {isLoading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-8">
          <WordInputForm onSearch={handleSearch} onClear={handleClear} />
          <ResultsDisplay words={filteredWords} />
        </div>
      )}
    </div>
  );
}

export default App;
