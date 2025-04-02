# How to Setup Locally

Setting up the **EVM Agent Kit** on your local machine involves cloning the repository, installing dependencies, configuring environment variables, and building the project. Follow the steps below to get started.

## Prerequisites

- **Node**: Ensure you have Node version 20.x or higher installed. You can download it from [Node Official Website](https://nodejs.org/).
- **Package Manager**: The project uses `pnpm` for package management. You can install it with `npm install -g pnpm`.
- **Git**: Ensure Git is installed and configured. Download from [Git Official Website](https://git-scm.com/).

## Step-by-Step Guide

1. **Clone the Repository**
   ```bash
   git clone https://github.com/hologramlabs/evm-agent-kit.git
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd evm-agent-kit
   ```

3. **Install Dependencies**

   Install all necessary dependencies by running:
   ```bash
   pnpm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the root directory of the project to store your environment variables securely. This file should include the following variables:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   RPC_URL=your_evm_rpc_url_here
   EVM_PRIVATE_KEY=your_wallet_private_key
   ```

   - **OPENAI_API_KEY**: Your OpenAI API key for generating images and interacting with OpenAI services.
   - **RPC_URL**: Your EVM RPC URL for blockchain interactions (e.g., BSC, Ethereum).
   - **EVM_PRIVATE_KEY**: Your wallet's private key.

   **Note:** Ensure that the `.env` file is added to `.gitignore` to prevent exposing sensitive information.

5. **Build the Project**

   Compile the TypeScript code to JavaScript using the build script:
   ```bash
   pnpm run build
   ```

   This will generate the compiled files in the `dist/` directory.

6. **Generate Documentation (Optional)**

   If you wish to generate the project documentation, use the following command:
   ```bash
   pnpm run docs
   ```

   The documentation will be available in the `docs/` directory.

---

**Additional Information:**

- **Git Configuration:** Ensure that Git is properly configured with your user name and email. You can set them using:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

- **Verifying Installation:**

  After installing dependencies and building the project, you can verify the installation by running:
  ```bash
  pnpm run build
  pnpm run test
  ```

  Ensure that all tests pass successfully.

---