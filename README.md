# Online Trivia Game

Welcome to the Online Trivia Game! This project allows users to host trivia games and other users to join and participate by choosing the answers. The backend is built using NestJS and MongoDB, while the frontend is developed with Svelte.

## Features

- Host a trivia game and invite other users to join
- Multiple players can join the game and participate
- Choose from a variety of trivia questions and categories
- Real-time updates and score tracking
- Interactive user interface with Svelte

## Technologies Used

- Backend: NestJS, MongoDB
- Frontend: Svelte

## Prerequisites

- Node.js and npm should be installed on your machine.

## Getting Started

1. Clone the repository:

   ```shell
   git clone <repository-url>
   ```

2. Install the dependencies for the backend:

   ```shell
   cd backend
   npm install
   ```

3. Configure the MongoDB connection by updating the `.env` file:

   ```env
   MONGO_URI=<your-mongodb-connection-url>
   ```

4. Start the backend server:

   ```shell
   npm run start
   ```

5. Install the dependencies for the frontend:

   ```shell
   cd ../frontend
   npm install
   ```

6. Start the frontend development server:

   ```shell
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5000` to access the Online Trivia Game.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).