# Project Title

A brief description about your project.

## Setup

The following steps will show you how to setup the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Docker
- PostgreSQL

### Installation Steps

1. Clone the repository.
2. Run the `create-table.sql` script in your PostgreSQL database to create the necessary tables. This script is located in the root directory of the project.
3. Navigate to the `backend` directory and create a `.env` file with the following format:

```env
DB_NAME=
DB_USER=
DB_PORT=
DB_HOST=
DB_PASSWORD=
SECRET_KEY=
```

3. Build the Docker image by running the following command in the root directory:

```bash
docker build -t my-app .
```

4. Run the Docker image:

```bash
docker run -p 3000:3000 -p 8000:8000 my-app
```

The application should now be running at `http://localhost:3000`.

## Project Structure

- `backend`: This directory contains a Node.js + Express app. The entry point is `app.js`.
- `frontend`: This directory contains a typical React app.
- `Dockerfile`: This file is used to build a Docker image for the app.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
