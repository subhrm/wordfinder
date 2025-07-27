##### 2.2.4. Global Inclusion Filter (1 Input)

* **Description:** A single input field.
* **Purpose:** To specify characters that *must* appear somewhere in the word, but their position is not fixed.
* **Input Type:** Multiple characters (alphabetic, comma-separated or simply concatenated). Non-alphabetic input should be prevented or automatically filtered. Input should be converted to lowercase.
* **Behavior:** If characters are entered (e.g., "ae"), only words containing both 'a' and 'e' (anywhere in the word) will be matched. Note: This is an "AND" condition, not "OR".
