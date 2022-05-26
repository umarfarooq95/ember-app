echo "server {"
echo "    listen       80;"
echo "    server_name  localhost;"
echo ""
echo "    gzip         on;"
echo "    gzip_types   application/json application/javascript text/css text/html;"
echo "    gzip_proxied any;"
echo ""
echo "    root /etc/nginx/html;"
echo "    index index.html;"
echo ""
echo "   location / {"
echo "       proxy_set_header Accept-Encoding \"\";"
echo "       try_files \$uri \$uri/ =404;"
echo "       sub_filter_types *;"
echo "       sub_filter_once off;"
echo ""

VARS=`export | grep ZZZ_ | sed 's/^.*ZZZ_//'`

for i in $VARS
do
	KEY=`echo $i | sed 's/=.*//'`
        VALUE=`echo $i | sed 's/.*=//'
`
        echo "       sub_filter '$KEY' $VALUE;"
done
echo "   }"
echo "}"
