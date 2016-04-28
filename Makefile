deploy-production:
	- ssh jenkins@localhost docker rm -f sails_sample_prod
	ssh jenkins@localhost docker run -d --name sails_sample_prod -p 8800:1337 agileworks/sails_sample_prod

build-docker-env:
	docker build -t agileworks/sails_sample_env dockers/node

build-docker-prod-image:
	docker build -t agileworks/sails_sample_prod .
