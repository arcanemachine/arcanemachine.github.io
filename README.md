# nicholas-moen

My personal portfolio website.


### Usage instructions

Works with both `podman` and `docker`, in combination with `docker-compose`.

To run in dev mode:
  docker-compose:
    - `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`
  podman-compose:
    - `docker-compose -H unix:$XDG_RUNTIME_DIR/podman/podman.sock -f docker-compose.yml -f docker-compose.dev.yml up`

To run in test environments (ie. identical to production but at a different URL):
  docker-compose:
    - `docker-compose -f docker-compose.yml -f docker-compose.test.yml up`
  podman-compose:
    - `docker-compose -H unix:$XDG_RUNTIME_DIR/podman/podman.sock -f docker-compose.yml -f docker-compose.test.yml up`

To run in production:
  docker-compose:
    - `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`
  podman-compose:
    - `docker-compose -H unix:$XDG_RUNTIME_DIR/podman/podman.sock -f docker-compose.yml -f docker-compose.prod.yml up`


### Allowing port 80-1024 on unprivileged hosts

- `sudo sysctl net.ipv4.ip_unprivileged_port_start=80`
