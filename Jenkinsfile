node {

  stage 'checkout project'
  git url: 'https://github.com/TrunkWorkshop/sailsSample.git'

  stage 'docker env check'

  sh "docker -v"
  sh "docker-compose -v"
  sh "docker ps"

  stage 'build docker env'
  sh "make build-docker-env"

  stage 'build project'
  sh "docker-compose run --rm buildDev"

  stage 'test project'
  sh "docker-compose run --rm test"

  stage 'run project'
  sh "docker-compose up -d dev"

  try{
    stage 'Approve, production flow'
    def url = 'http://localhost:8000/'
    input message: "Does staging at $url look good? ", ok: "Deploy to production"
  }finally{
    sh "docker-compose stop dev"
  }

  stage 'build docker production image'
  sh "make build-docker-prod-image"

  stage 'publish docker production image'
  sh "docker push agileworks/sails_sample_prod"

  stage 'deploy production'
  sh "make deploy-production"

}
