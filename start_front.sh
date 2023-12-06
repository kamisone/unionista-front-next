#!/bin/bash
docker compose --file /srv/front/current/docker-compose.yml down --remove-orphans
docker compose --file /srv/front/current/docker-compose.yml up --build