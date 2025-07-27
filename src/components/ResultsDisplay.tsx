import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsDisplayProps {
  words: string[];
}

export function ResultsDisplay({ words }: ResultsDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Found {words.length} words.</p>
        {words.length > 0 ? (
          <div className="columns-2 md:columns-4 lg:columns-6">
            {words.map((word) => (
              <div key={word}>{word}</div>
            ))}
          </div>
        ) : (
          <p>No words found matching your criteria.</p>
        )}
      </CardContent>
    </Card>
  );
}
