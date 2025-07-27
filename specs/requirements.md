## WordFinder Project: Detailed Specification

### 1. Project Overview

**Project Name:** WordFinder
**Type:** Web Application
**Frontend Framework:** React
**UI Components:** shadcn/ui
**State Management:** React's built-in state management (useState, useEffect) or Context API for larger state management needs.
**Build Tool:** Vite
**Deployment:** Static hosting 
**Language:** Typescript 
**Device Compatibility:** Modern Desktop and Mobile Browsers
**Purpose:** To assist users in finding English words from a loaded dictionary, initially focusing on 5-letter words with advanced filtering capabilities.

### 2. Core Functionality - 5-Letter Word Finder

The initial release of WordFinder will focus exclusively on finding 5-letter words.

#### 2.1. Word List Loading

* **Source:** The application must load a word list (vocabulary) file from a specified URL at startup.
* **Format:** The word list file is expected to be a plain text file, with one word per line. All words will be lowercase.
* **Error Handling:**
    * If the URL is inaccessible or the file cannot be loaded, a user-friendly error message should be displayed (e.g., "Failed to load word list. Please check your internet connection or try again later.").
    * The application should ideally provide a retry mechanism.
* **Loading Indicator:** A visual indicator (e.g., spinner, "Loading words...") should be displayed while the word list is being fetched.

#### 2.2. User Interface (UI) - 5-Letter Word Finder

The UI for the 5-letter word finder will consist of the following input fields and controls:

##### 2.2.1. Positional Character Filters (5 Inputs)

* **Description:** Five individual input fields, one for each position of a 5-letter word (Position 1, Position 2, Position 3, Position 4, Position 5).
* **Purpose:** To specify a character that *must* exist at a given position.
* **Input Type:** Single character (alphabetic). Non-alphabetic input should be prevented or automatically filtered. Input should be converted to lowercase.
* **Behavior:** If a character is entered, only words containing that character at that exact position will be matched.

##### 2.2.2. Positional Exclusion Filters (5 Inputs)

* **Description:** Five individual input fields, one for each position.
* **Purpose:** To specify characters that *cannot* exist at a given position.
* **Input Type:** Multiple characters (alphabetic, comma-separated or simply concatenated). Non-alphabetic input should be prevented or automatically filtered. Input should be converted to lowercase.
* **Behavior:** If characters are entered (e.g., "oa"), words containing any of those characters at that exact position will be excluded.

##### 2.2.3. Global Exclusion Filter (1 Input)

* **Description:** A single input field.
* **Purpose:** To specify characters that *must not* appear anywhere in the word.
* **Input Type:** Multiple characters (alphabetic, comma-separated or simply concatenated). Non-alphabetic input should be prevented or automatically filtered. Input should be converted to lowercase.
* **Behavior:** If characters are entered (e.g., "xyz"), any word containing 'x', 'y', or 'z' will be excluded.

##### 2.2.4. Global Inclusion Filter (1 Input)

* **Description:** A single input field.
* **Purpose:** To specify characters that *must* appear somewhere in the word, but their position is not fixed.
* **Input Type:** Multiple characters (alphabetic, comma-separated or simply concatenated). Non-alphabetic input should be prevented or automatically filtered. Input should be converted to lowercase.
* **Behavior:** If characters are entered (e.g., "ae"), only words containing both 'a' and 'e' (anywhere in the word) will be matched. Note: This is an "AND" condition, not "OR".

##### 2.2.5. Search Button

* **Description:** A prominent button to trigger the word search.
* **Behavior:** Clicking this button will initiate the filtering process based on the current input values.

##### 2.2.6. Clear Filters Button

* **Description:** A button to reset all input fields to their default empty state.
* **Behavior:** Clicking this button will clear all specified filters.

##### 2.2.7. Results Display Area

* **Description:** An area to display the found words.
* **Layout:** Words should be displayed in a clear, readable format (e.g., a scrollable list, possibly in columns).
* **Count:** The total number of found words should be displayed above the list (e.g., "Found 123 words").
* **No Results Message:** If no words match the criteria, a message should be displayed (e.g., "No words found matching your criteria.").

#### 2.3. Filtering Logic

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

### 3. Technical Considerations

#### 3.1. React Components

Consider the following React components:

* **`App` (Main Component):** Manages overall state, word list loading, and potentially routing (if future features are added).
* **`WordInputForm`:** Encapsulates all the input fields, search button, and clear button. Manages its own local state for the input values and passes them up to a parent component for filtering.
* **`ResultsDisplay`:** Receives the filtered words as props and renders them.
* **`LoadingIndicator`:** Simple component for showing loading state.

#### 3.2. State Management

* **Word List:** The loaded word list should be stored in the application's state (e.g., `useState` in `App` or a more advanced state management solution like Redux/Context API if the project scales).
* **Filter Criteria:** The values from all input fields should be managed in the state of `WordInputForm` and then passed to the filtering logic.
* **Filtered Words:** The result of the filtering operation should be stored in the state of `App` (or a parent component) and passed down to `ResultsDisplay`.

#### 3.3. Performance

* **Filtering Efficiency:** For potentially large word lists, optimize the filtering logic to be efficient. Avoid re-calculating filters unnecessarily. Debouncing input changes could be considered if performance becomes an issue with very frequent typing.
* **Memoization:** Consider using `React.memo` or `useMemo`/`useCallback` to prevent unnecessary re-renders of components, especially the `ResultsDisplay` if the word list is large.

#### 3.4. Styling

* **Framework Agnostic:** Do not prescribe a specific CSS framework (e.g., Tailwind CSS, Bootstrap). Leave it to the developer's discretion or project standards.
* **Responsiveness:** The UI should be reasonably responsive and usable on different screen sizes.

### 4. Future Enhancements (Out of Scope for Initial Release, but good to keep in mind)

* **Variable Word Length:** Allow users to specify the desired word length.
* **"Contains" Filter:** Allow specifying characters that must be present, but not necessarily at a fixed position, and the user can specify the minimum/maximum occurrences.
* **Regex Support:** Advanced users might appreciate regular expression filtering.
* **Custom Word List Upload:** Allow users to upload their own word list files.
* **Dark Mode:** A toggle for dark mode.
* **Save/Share Filters:** Ability to save or share the current filter configuration.
* **Autocomplete/Suggestions:** As the user types, suggest possible characters or words (more complex).

### 5. Development Workflow & Tools

* **Create React App (CRA) or Vite:** Recommended for quickly setting up the React project.
* **Version Control:** Git (e.g., GitHub, GitLab, Bitbucket).
* **Linter/Formatter:** ESLint, Prettier for code consistency.
* **Testing:** Jest/React Testing Library for unit and integration tests 

### 6. Project Structure

* src/ - Contains the React application source code.
* public/ - Contains static assets (e.g., index.html).
* package.json - Contains project dependencies and scripts.
* .gitignore - Specifies files and directories to ignore in version control. 
* **README.md:** A comprehensive `README.md` file including:
    * Project description.
    * Setup instructions (how to run the app locally).
    * Instructions for use.
    * URL of the word list file used.
    * Any known limitations or future plans.
