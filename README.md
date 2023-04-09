# nsfw-discord-bot


build image
{
docker build -t nsfw-discord-bot . 
}
build container
{
docker run -d --name nsfw-bot-1 -e TOKEN= -e channel_id= -e rollid= nsfw-discord-bot
}


docker ps -a

docker rm <container id || container name>

docker images 

docker image rm <image id || image name>

docker container stop <id || name>
docker container start <id || name>

docker exec -it <container id || container name> sh
