# Contributing to EVM Agent Kit

Thank you for your interest in contributing to EVM Agent Kit! This document provides guidelines and instructions for contributing to this project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)
- [Creating New Tools and Actions](#creating-new-tools-and-actions)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:
- Be respectful and inclusive
- Be patient and welcoming
- Be thoughtful
- Be collaborative
- Ask for help when unsure
- Stay on topic
- Be open to constructive feedback

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/evm-agent-kit.git
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/original-owner/evm-agent-kit.git
   ```
4. Install dependencies:
   ```bash
   pnpm install
   ```
5. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Fill in the required environment variables in `.env`

### Requirements
- Node.js >= 20.0.0
- pnpm >= 8.0.0

## Development Workflow

1. Make sure you have the latest changes from the main branch:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   git checkout your-feature-branch
   git rebase main
   ```

2. Make your changes following the code style guidelines
3. Write or update tests as needed
4. Update documentation if necessary
5. Commit your changes using conventional commits:
   ```
   feat: add new feature
   fix: resolve bug
   docs: update documentation
   test: add test cases
   chore: update dependencies
   ```
6. Push your changes to your fork:
   ```bash
   git push origin your-feature-branch
   ```

## Code Style Guidelines

We use ESLint and Prettier to maintain consistent code style. Our configuration includes:

### TypeScript Standards
- Use TypeScript for all new code
- Maintain strict type checking
- Avoid using `any` type when possible
- Use explicit return types for functions
- Follow the existing code structure and patterns

### Formatting Rules
- Use double quotes for strings
- Use 2 spaces for indentation
- Maximum line length of 100 characters
- Always use semicolons
- Use trailing commas in multiline constructs
- Always use curly braces for control statements

### Best Practices
- Write self-documenting code with clear variable and function names
- Keep functions small and focused
- Use async/await for asynchronous operations
- Handle errors appropriately
- Add comments for complex logic
- Follow the DRY (Don't Repeat Yourself) principle

### Git Hooks
We use Husky and lint-staged to enforce code quality:
- Pre-commit hooks run linting and formatting
- Commits are blocked if code style checks fail

## Testing

1. Write tests for all new features and bug fixes
2. Run tests using the appropriate command:
   ```bash
   # Run all tests
   pnpm test
   
   # Run Vercel AI specific tests
   pnpm test:vercel-ai
   
   # Run MCP tests
   pnpm test:mcp
   
   # Run tests with Vitest
   pnpm eval
   ```
3. Maintain or improve test coverage
4. Include both unit tests and integration tests where appropriate

## Documentation

1. Update the README.md if needed
2. Document new features and APIs
3. Include examples for new functionality
4. Update any relevant guides in the `guides/` directory
5. Add JSDoc comments for public APIs
6. Generate documentation:
   ```bash
   pnpm docs
   ```
7. Generate tool summaries:
   ```bash
   pnpm tool-summary
   pnpm tool-summary:langchain
   ```

## Project Structure

The project is organized into the following main directories:

- `src/`
  - `actions/` - Action definitions for AI agents
  - `agent/` - Core agent implementation
  - `langchain/` - LangChain tool implementations
  - `tools/` - Core tool implementations
  - `utils/` - Utility functions
  - `wallet-providers/` - Wallet provider implementations
  - `constants/` - Project constants
  - `types/` - TypeScript type definitions
  - `mcp/` - Model Context Protocol implementation
  - `vercel-ai/` - Vercel AI SDK integration
  - `network/` - Network-related functionality

## Pull Request Process

1. **Important**: Direct pushes to the main branch are not allowed. All changes must go through pull requests.
2. Create a pull request from your feature branch to the main branch
3. Ensure your PR addresses a single concern
4. Update the README.md with details of changes if needed
5. Update the documentation if you're changing functionality
6. The PR will be merged once you have the sign-off of at least one maintainer
7. Make sure all CI checks pass
8. Keep your PR up to date with the main branch:
   ```bash
   git fetch upstream
   git rebase upstream/main
   git push -f origin your-feature-branch
   ```

### PR Description Template
```markdown
## Description
[Description of the changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
[Description of how you tested the changes]

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] All tests pass locally
- [ ] I have rebased my branch with the latest main
```

## Release Process

1. Version bumping is handled by maintainers
2. Releases are made from the main branch
3. Release notes are generated from PR descriptions
4. Documentation is updated for each release

## Creating New Tools and Actions

When adding new functionality to EVM Agent Kit, you'll need to create three components:
1. A core tool that interacts with external services or blockchain operations
2. A LangChain tool that makes your functionality accessible to AI agents
3. An action that provides a structured interface for your tool

For a complete example of creating a new tool, please refer to the [Creating a New Tool](README.md#creating-a-new-tool) section in the README.md file.

## Questions?

If you have any questions, please open an issue or reach out to the maintainers.

Thank you for contributing to EVM Agent Kit! 