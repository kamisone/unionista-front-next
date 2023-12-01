#!/bin/bash
npm install
npm install next
docker compose --file /srv/front/docker-compose.yml up --build