node {

  stage 'checkout project'
  git url: 'https://github.com/TrunkWorkshop/sailsSample.git'

  stage 'check env'
  sh "node -v"

  stage 'install pm2'
  sh "npm install pm2 -g"

  stage 'build project'
  sh "npm install"

  stage 'test project'
  sh "npm run test-junit"
  step([$class: 'JUnitResultArchiver', testResults: 'test-results.xml'])

  stage 'run project'
  sh "npm run pm2-start"

  try{
    stage 'Approve, go production'
    def url = 'http://localhost:1337/'
    input message: "Does staging at $url look good? ", ok: "Deploy to production"
  }finally{
    sh "npm run pm2-stop"
  }

  stage 'package production'
  sh "make package-production"
  step([$class: 'ArtifactArchiver', artifacts: 'sailsSampleProd.tar.gz', fingerprint: true])

  stage 'deploy production'
  sh "make deploy-production-legacy"

  stage 'restart production'
  sh "make restart-production"

}
