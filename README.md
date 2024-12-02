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

### Building the Docker Image

1. Build the image locally:
   ```bash
   docker build -t coolify-docker-test-nodejs-api .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 coolify-docker-test-nodejs-api
   ```

### Publishing to Docker Hub

1. Build your image with version (for x86/amd64 platforms):
   ```bash
   # For x86/amd64 platforms (most cloud providers)
   docker build --platform=linux/amd64 -t coolify-docker-test-nodejs-api:0.1.0 .
   
   # For local architecture (if running locally)
   docker build -t coolify-docker-test-nodejs-api:0.1.0 .
   ```

2. Tag your image with both version and latest:
   ```bash
   # Tag with version number
   docker tag coolify-docker-test-nodejs-api:0.1.0 YOUR_DOCKERHUB_USERNAME/coolify-docker-test-nodejs-api:0.1.0
   
   # Tag as latest
   docker tag coolify-docker-test-nodejs-api:0.1.0 YOUR_DOCKERHUB_USERNAME/coolify-docker-test-nodejs-api:latest
   ```

3. Login to Docker Hub:
   ```bash
   docker login
   ```

4. Push both tags:
   ```bash
   # Push version tag
   docker push YOUR_DOCKERHUB_USERNAME/coolify-docker-test-nodejs-api:0.1.0
   
   # Push latest tag
   docker push YOUR_DOCKERHUB_USERNAME/coolify-docker-test-nodejs-api:latest
   ```

### Platform Compatibility Notes

- If you're building on an ARM-based machine (like M1/M2 Mac) and deploying to x86/amd64 servers, use the `--platform=linux/amd64` flag during build
- For local development on ARM machines, you can omit the platform flag
- Most cloud providers (including Coolify) typically use x86/amd64 architecture

### Version History

- 0.1.0: Initial release
  - Basic API endpoints (/, /version)
  - Detailed logging
  - Docker support
  - Coolify compatibility

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
