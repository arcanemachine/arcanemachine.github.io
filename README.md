# nicholas-moen

My personal portfolio website.


### Usage instructions

Works with both `podman` and `docker`.

To run in dev mode:
  - `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`

To run in test mode:
  - `docker-compose -f docker-compose.yml -f docker-compose.test.yml up`

To run in prod mode:
  - `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`


### Allowing port 80-1024 on unprivileged hosts

- `sudo sysctl net.ipv4.ip_unprivileged_port_start=80`
