import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Telescope } from "lucide-react";

interface ResultsDisplayProps {
  words: string[];
}

export function ResultsDisplay({ words }: ResultsDisplayProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg mt-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          <Telescope className="w-5 h-5" />
          Results
        </CardTitle>
        <Badge variant="secondary" className="px-3 py-1 font-mono text-sm">
          {words.length} found
        </Badge>
      </CardHeader>
      <CardContent>
        {words.length > 0 ? (
          <ScrollArea className="h-[400px] w-full rounded-md border bg-background/50 p-4">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {words.map((word) => (
                <Badge
                  key={word}
                  variant="outline"
                  className="justify-center py-2 text-base font-medium font-mono uppercase tracking-wider hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all cursor-default select-all"
                >
                  {word}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground border-2 border-dashed rounded-lg border-muted">
            <p className="text-lg">No words found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
