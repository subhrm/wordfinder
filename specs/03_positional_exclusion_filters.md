##### 2.2.2. Positional Exclusion Filters (5 Inputs)

* **Description:** Five individual input fields, one for each position.
* **Purpose:** To specify characters that *cannot* exist at a given position.
* **Input Type:** Multiple characters (alphabetic, comma-separated or simply concatenated). Non-alphabetic input should be prevented or automatically filtered. Input should be converted to lowercase.
* **Behavior:** If characters are entered (e.g., "oa"), words containing any of those characters at that exact position will be excluded.
