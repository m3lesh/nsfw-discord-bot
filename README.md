
# About

Discord bot nsfw using pornhub api 


## docker setup

build image

```bash
  sudo docker build -t nsfw-discord-bot .
```

build container

```bash
  docker run -d --name nsfw-bot-1 -e TOKEN=<TOKEN> -e channel_id=<channel id> -e roleid=<role id> nsfw-discord-bot
```


## docker command

### docker images

show all images

```bash
sudo docker images
```

remove images


```bash
sudo docker image rm <image id or image name>
```

### docker containers

show all containers

```bash
sudo docker ps -a
```

remove container

```bash
sudo docker rm <container id or container name>
```

start container

```bash
sudo docker container start <id or name>
```
stop container

```bash
sudo docker container stop <id or name>
```
edit container

```bash
sudo docker exec -it <container id or container name> sh
```
