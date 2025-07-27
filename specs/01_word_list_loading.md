## 2.1. Word List Loading

* **Source:** The application must load a word list (vocabulary) file from a specified URL at startup.
* **Format:** The word list file is expected to be a plain text file, with one word per line. All words will be lowercase.
* **Error Handling:**
    * If the URL is inaccessible or the file cannot be loaded, a user-friendly error message should be displayed (e.g., "Failed to load word list. Please check your internet connection or try again later.").
    * The application should ideally provide a retry mechanism.
* **Loading Indicator:** A visual indicator (e.g., spinner, "Loading words...") should be displayed while the word list is being fetched.
