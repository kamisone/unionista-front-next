#!/bin/bash
docker compose --file /srv/front/current/docker-compose.yml down
docker compose --file /srv/front/current/docker-compose.yml up --build