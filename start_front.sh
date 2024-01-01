#!/bin/bash
docker compose --file /srv/front/current/docker-compose.yml down
NETWORK_NAME=unionistashop_network
if [ -z $(docker network ls --filter name=^${NETWORK_NAME}$ --format="{{ .Name }}") ] ; then 
     docker network create --driver bridge ${NETWORK_NAME} ; 
fi
docker compose --file /srv/front/current/docker-compose.yml up --build
