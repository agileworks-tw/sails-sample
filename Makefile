deploy-production:
	- ssh jenkins@localhost docker rm -f sails_sample_prod
	ssh jenkins@localhost docker run -d --name sails_sample_prod -p 8800:1337 agileworks/sails_sample_prod

build-docker-env:
	docker build -t agileworks/sails_sample_env dockers/node

build-docker-prod-image:
	docker build -t agileworks/sails_sample_prod .

package-production:
	mkdir -p ~/build
	- rm ~/build/sailsSampleProd.tar.gz
	tar cvzf ~/build/sailsSampleProd.tar.gz ./

deploy-production-legacy:
	ssh jenkins@localhost mkdir -p ~/deploy/production
	scp  ~/build/sailsSampleProd.tar.gz jenkins@localhost:~/deploy/production
	tar -C ~/deploy/production/ -zvxf ~/deploy/production/sailsSampleProd.tar.gz

restart-production:
	ssh jenkins@localhost cd ~/deploy/production && pm2 start app.js --name 'production'
