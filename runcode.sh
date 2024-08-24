# Build docker image and run the container
docker build -t app .
docker volume create --name nodemodules

# Load the environment variables
source .env
# Run the container
docker run -it --rm app
