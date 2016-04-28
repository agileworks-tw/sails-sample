preview:
	# build or compile project
	npm i
	npm run build-prod
	zip -r build.zip ./ > /dev/null

	# trnsfer file
	ssh jenkins@localhost mkdir -p ~/deploy/temp ~/deploy/preview
	scp build.zip jenkins@localhost:~/deploy/temp

	# start server
	ssh jenkins@localhost \
		rm -rf ~/deploy/preview && \
		mkdir -p ~/deploy/preview && \
		unzip -o ~/deploy/temp/build.zip -d ~/deploy/preview > /dev/null && \
		pm2 kill && \
		pm2 start ~/deploy/preview/app.js

build-docker-env:
	docker build -t agileworks/sails_sample_env dockers/node

build-docker-image:
	docker build -t agileworks/sails_sample_prod .
