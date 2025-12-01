# swstarter

**NOTE: On 28 November, a rebase was performed to update the git author (I was using my work git account and it is not allowed). This action updated the commit history. A branch named "before-fix-git-author" has been created to allow reviewers to follow the original timeline. This branch will be removed after the job interview process.**

## Running with Docker

To run the application using Docker, you'll need to have Docker and docker-compose installed.

1.  Build and start the services:
    ```bash
    docker-compose up --build
    ```

2.  The application will be available at:
    - Web: [http://localhost:8081](http://localhost:8081)
    - Server: [http://localhost:3001](http://localhost:3001)

To stop the services, run:
```bash
docker-compose down
```