node_modules/.bin/ember build --environment=production

docker build \
       -t tb-cloud/driverportal \
       -t registry1.ddswireless.com:5500/tb-cloud/driverportal \
       -t 192.168.95.201:5000/tb-cloud/driverportal \
       -f Dockerfile .

