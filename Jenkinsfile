pipeline {
  agent any

  environment {
    TOKEN = credentials('POS_TOKEN')
    EMAIL = "darek+ci@near-me.com"
  }

  options {
    disableConcurrentBuilds()
    timeout(time: 30, unit: 'MINUTES')
    buildDiscarder(logRotator(daysToKeepStr: '365', artifactDaysToKeepStr: '30'))
  }

  stages {
    stage('Staging') {
      environment {
        MP_URL = "https://nearme-example.staging.oregon.platform-os.com"
        GH_URL = "https://github.com/mdyd-dev/marketplace-nearme-example"
      }

      when {
        branch 'release_candidate'
      }

      steps {
        script {
          commitSha = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          commitAuthor = sh(returnStdout: true, script: 'git log --no-merges --format="%an" -1').trim()
          commitMsg = sh(returnStdout: true, script: 'git log --no-merges --format="%B" -1').trim()

          commitInfo = "<${env.GH_URL}/commit/${commitSha}|${commitSha}> - ${commitAuthor} - ${commitMsg}"
        }

        slackSend (channel: "#notifications-example", message: "STARTED: Deploying to <${MP_URL}|staging environment> (<${env.BUILD_URL}|Build #${env.BUILD_NUMBER}>) \n ${commitInfo}")

        sh 'bash -l ./scripts/deploy.sh'
        sh 'bash -l ./scripts/test-e2e.sh'
      }

      post {
        success {
          slackSend (channel: "#notifications-example", color: '#00FF00', message: "SUCCESS: Deployed new code to staging (<${MP_URL}|Preview staging>)")
        }

        failure {
          slackSend (channel: "#notifications-example", color: '#FF0000', message: "FAILED: Build failed (<${env.BUILD_URL}|Open build details>)")
        }
      }
    }
  }
}
