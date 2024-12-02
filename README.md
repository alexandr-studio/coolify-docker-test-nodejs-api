# Hono Test API

A simple test API built with Node.js and the Hono framework. This project provides basic endpoints and is containerized using Docker.

## Features

- Root endpoint (`/`) returning a welcome message and timestamp
- Version endpoint (`/version`) showing application details
- Detailed logging for debugging
- Docker support for easy deployment
- Coolify-ready configuration

## API Endpoints

- `GET /`: Returns a welcome message with timestamp
- `GET /version`: Returns version information and runtime details

## Prerequisites

- Node.js (v16 or higher)
- npm
- Docker

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## Docker Instructions

### Building the Docker Image

1. Build the image locally:
   ```bash
   docker build -t hono-test-api .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 hono-test-api
   ```

### Publishing to Docker Hub

1. Build your image with version:
   ```bash
   docker build -t hono-test-api:0.1.0 .
   ```

2. Tag your image with both version and latest:
   ```bash
   # Tag with version number
   docker tag hono-test-api:0.1.0 YOUR_DOCKERHUB_USERNAME/hono-test-api:0.1.0
   
   # Tag as latest
   docker tag hono-test-api:0.1.0 YOUR_DOCKERHUB_USERNAME/hono-test-api:latest
   ```

3. Login to Docker Hub:
   ```bash
   docker login
   ```

4. Push both tags:
   ```bash
   # Push version tag
   docker push YOUR_DOCKERHUB_USERNAME/hono-test-api:0.1.0
   
   # Push latest tag
   docker push YOUR_DOCKERHUB_USERNAME/hono-test-api:latest
   ```

### Version History

- 0.1.0: Initial release
  - Basic API endpoints (/, /version)
  - Detailed logging
  - Docker support
  - Coolify compatibility

## Deploying to Coolify

### Option 1: Using Dockerfile in Coolify

1. In Coolify, create a new service
2. Choose "Dockerfile" as the deployment method
3. Copy the contents of the Dockerfile from this repository
4. Set the following environment variables:
   - `PORT=3000`
   - `NODE_ENV=production`
5. Deploy the service

### Option 2: Using Pre-built Docker Image

1. In Coolify, create a new service
2. Choose "Docker Image" as the deployment method
3. Enter your Docker image URL: `YOUR_DOCKERHUB_USERNAME/hono-test-api:latest`
4. Set the following environment variables:
   - `PORT=3000`
   - `NODE_ENV=production`
5. Deploy the service

## Testing the API

You can test the API using curl:

```bash
# Test root endpoint
curl http://localhost:3000/

# Test version endpoint
curl http://localhost:3000/version
```

## Debugging

The application includes detailed logging:
- All HTTP requests are logged automatically
- Request headers and body (if present) are logged
- Response times and status codes are tracked
- Health check status is available through Docker

## License

ISC
