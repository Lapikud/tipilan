# Setup

## Prerequisites
- Git
- Bun

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Lapikud/tipilan.git
   ```
2. Install bun:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
3. Install dependencies:
   ```bash
   cd tipilan
   bun install
   ```
4. Run the application:
   ```bash
   bun run dev
   ```
5. Build the application:
   ```bash
   bun run build
   ```
## Accessing the Application
- The application is now running at `http://localhost:3000`.

## Git branch
- The current production branch is `main`.
- Please make sure you make changes in your branch before creating a pull request.
### Making git branch
- Create a new branch:
   ```bash
   git checkout -b <branch-name>
   ```
- Commit your changes:
   ```bash
   git add .
   git commit -m "<commit-message>"
   ```
- Push your branch:
   ```bash
   git push origin <branch-name>
   ```
- Create a pull request:
   ```bash
   git pull-request
   ```
