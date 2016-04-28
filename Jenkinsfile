node {
   stage 'build env'
   sh "docker build -t agileworks/sails_sample_env dockers/node"

   stage 'Checkout'
   git url: 'https://github.com/TrunkWorkshop/sailsSample.git'

   stage 'check'
   sh "docker -v"
   sh "docker-compose -v"

   stage 'Build dev'
   sh "docker-compose run --rm buildDev"

   stage 'test'
   sh "docker-compose run --rm test"

   stage 'build prod'
   sh "docker-compose run --rm buildProd"

   stage 'build production image'
   sh "docker build -t agileworks/sails_sample_prod ."

   stage 'push production image'
   sh "docker push agileworks/sails_sample_prod"
}
