node {

  try {
    slackSend channel: '#general', message: "started ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", teamDomain: 'trunk-agileworks', token: 'JhXFKEl6cBFoQ4v52BEJw9Mr'

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

    slackSend channel: '#general', color: 'good', message: "success ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", teamDomain: 'trunk-agileworks', token: 'JhXFKEl6cBFoQ4v52BEJw9Mr'
  }catch(e){
    slackSend channel: '#general', color: 'danger', message: "fail ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", teamDomain: 'trunk-agileworks', token: 'JhXFKEl6cBFoQ4v52BEJw9Mr'
    throw e;
  }

}
