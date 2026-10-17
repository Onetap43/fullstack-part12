# Full Stack Open - Part 12: Containers

My solutions for the Full Stack Open Part 12 exercises.

## Exercises 22 and 23 - My Own Full Stack Application

I containerized my Bloglist application using Docker and Docker Compose.

### Original Application Repository

https://github.com/Onetap43/fullstackopen-part7-bloglist

### Dockerized Application

The `my-app/` directory contains:

- React frontend
- Express backend
- MongoDB database
- Nginx reverse proxy
- Development Docker Compose configuration
- Production Docker Compose configuration

### Running the Application

Create a `my-app/.env` file with a `BLOG_SECRET` value.

Development:

docker compose -f docker-compose.dev.yml up -d --build

Open http://localhost:8081

Production:

docker compose -f docker-compose.yml up -d --build

Open http://localhost:8082

Run Docker Compose commands from the `my-app/` directory.
