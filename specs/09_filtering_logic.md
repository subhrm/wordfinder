### 2.3. Filtering Logic

The filtering process should combine all specified criteria logically. All conditions are "AND" conditions unless explicitly stated otherwise.

* **Pre-filtering:** Only 5-letter words from the loaded dictionary should be considered for matching.
* **Positional Character Match:** A word must have the specified character at the exact position.
* **Positional Exclusion:** A word must *not* contain any of the excluded characters at the specified position.
* **Global Exclusion:** A word must *not* contain any of the globally excluded characters anywhere within the word.
* **Global Inclusion:** A word must contain *all* of the globally included characters anywhere within the word.

**Example Filtering Order (Recommended):**

1.  Filter by word length (fixed to 5).
2.  Apply Positional Character Matches.
3.  Apply Positional Exclusions.
4.  Apply Global Exclusions.
5.  Apply Global Inclusions.
