# WordFinder

**WordFinder** is a web application designed to help you with word games. Try it: [WordFinder App](https://wordfinder-af8.pages.dev/)

## ✨ Features

- **Advanced Pattern Matching**: Filter words based on exact character positions (Green tiles in Wordle).
- **Exclusion Logic**: Filter out words containing specific characters in specific spots (Yellow tiles).
- **Global Constraints**:
  - **Must Contain**: Filter for words that must contain a specific set of letters anywhere.
  - **Must Not Contain**: Filter out words that contain forbidden letters.
- **UI/UX**:
  - Deep dark theme with vibrant violet/indigo accents.
  - Responsive, grid-based results display.
  - Real-time feedback and clear visual hierarchy.
- **Instant Search**: Optimized filtering logic provides search results instantly.

## 🛠️ Tech Stack

This project is built with modern web technologies to ensure performance and developer experience:

- **Framework**: [React](https://react.dev/) (v19) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
  - Custom CSS Variables for theming.
  - CSS Modules for animations.
- **Fonts**: [Google Fonts](https://fonts.google.com/)
  - **Heading**: Outfit
  - **Body**: Inter
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Custom, accessible components inspired by shadcn/ui.

## 🚀 Getting Started

Follow these steps to get the project running locally on your machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wordfinder.git
   cd wordfinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` to view the application.

## 📖 Usage Guide

### 1. Positional Constraints (Green Tiles)
Use the **"Known Letters"** row to input characters that you know are in a specific position.
- *Example*: Entering `A` in the first slot searches for words starting with "A".

### 2. Positional Exclusions (Yellow Tiles)
Use the **"Excluded from Position"** row to specify letters that are in the word but **NOT** in that specific spot.

### 3. Global Filters
- **Must Contain**: Enter letters that must appear somewhere in the word (e.g., `AE` finds words containing both A and E).
- **Must Not Contain**: Enter letters that are definitely not in the word (e.g., `XYZ` removes any word with X, Y, or Z).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
