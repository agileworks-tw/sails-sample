deploy-production:
	ssh jenkins@localhost docker run -p 8800:1337 agileworks/sails_sample_prod

build-docker-env:
	docker build -t agileworks/sails_sample_env dockers/node

build-docker-prod-image:
	docker build -t agileworks/sails_sample_prod .
