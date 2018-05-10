# PortalClient

## Installation

### Node

1. edit config file
```sh
nano ecosystem.development.json
```

2. run
```sh
npm i

# dev
npm start

# prod
npm run build
NODE_ENV=production npm start
```


### Nginx

```
sudo nano /etc/nginx/sites-available/default
sudo nginx -s reload
```
