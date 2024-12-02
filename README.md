# Coolify Docker Test Node.js API

A test project built with Node.js and the Hono framework, specifically designed to verify Docker image deployment compatibility with Coolify. This repository serves as a proof-of-concept for running containerized Node.js applications on Coolify's infrastructure.

## Purpose

The main objectives of this repository are:
- Test Docker image deployment on Coolify platform
- Verify container orchestration and proxy handling
- Demonstrate proper configuration for Node.js applications in Coolify
- Provide a minimal, but production-ready container setup

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

### Building Docker Images

To build for a specific architecture:

```bash
# For ARM64 (e.g., Apple Silicon M1/M2)
docker build -t coolify-docker-test-nodejs-api:arm64 .

# For AMD64 (Intel/AMD processors)
docker build --platform linux/amd64 -t coolify-docker-test-nodejs-api:amd64 .
```

### Publishing to Docker Hub

1. Tag your architecture-specific image:
```bash
# For ARM64
docker tag coolify-docker-test-nodejs-api:arm64 YOUR_DOCKERHUB_USERNAME/coolify-docker-test-nodejs-api:arm64

# For AMD64
docker tag coolify-docker-test-nodejs-api:amd64 YOUR_DOCKERHUB_USERNAME/coolify-docker-test-nodejs-api:amd64
```

2. Push to Docker Hub:
```bash
# Push ARM64 version
docker push YOUR_DOCKERHUB_USERNAME/coolify-docker-test-nodejs-api:arm64

# Push AMD64 version
docker push YOUR_DOCKERHUB_USERNAME/coolify-docker-test-nodejs-api:amd64
```

### Platform Compatibility Notes

- Build the specific version that matches your deployment platform
- For Coolify deployment, use the AMD64 version (amd64 tag)
- For local development on ARM machines (M1/M2 Macs), use the ARM64 version (arm64 tag)
- The image tag clearly indicates which architecture it supports

## Deploying to Coolify

This repository is specifically designed to test Docker image deployment on Coolify. It serves as a validation tool for:
- Docker image compatibility with Coolify
- Container networking and proxy configuration
- Environment variable handling
- Health check functionality

### Option 1: Using Dockerfile in Coolify

1. In Coolify, create a new service
2. Choose "Dockerfile" as the deployment method
3. Copy the contents of the Dockerfile from this repository
4. Set the following environment variables:
   - `PORT=3000`
   - `NODE_ENV=production`
5. Deploy the service and monitor the logs for any issues

### Option 2: Using Pre-built Docker Image

1. In Coolify, create a new service
2. Choose "Docker Image" as the deployment method
3. Enter your Docker image URL: `YOUR_DOCKERHUB_USERNAME/coolify-docker-test-nodejs-api:latest`
4. Set the following environment variables:
   - `PORT=3000`
   - `NODE_ENV=production`
5. Deploy the service and verify the deployment

### Verifying the Deployment

After deployment, you can verify the setup by:
1. Checking if the service is healthy in Coolify dashboard
2. Accessing the root endpoint (`/`) through the provided URL
3. Checking the `/version` endpoint for correct version information
4. Monitoring the logs for detailed request information

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
