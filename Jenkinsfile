pipeline {
  agent any

  environment {
    TOKEN = credentials('POS_TOKEN')
    EMAIL = "darek+ci@near-me.com"
  }

  parameters {
    string(defaultValue: "https://nearme-example.staging.oregon.platform-os.com", description: 'nearme-example marketplace URL', name: 'MP_URL')
  }

  options {
    disableConcurrentBuilds()
    timeout(time: 30, unit: 'MINUTES')
    buildDiscarder(logRotator(daysToKeepStr: '365', artifactDaysToKeepStr: '30'))
  }

  stages {
    stage('Staging') {
      environment {
        GH_URL = "https://github.com/mdyd-dev/marketplace-nearme-example"
      }

      when {
        anyOf { branch 'release_candidate' }
      }

      steps {
        script {
          commitSha = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          commitAuthor = sh(returnStdout: true, script: 'git log --no-merges --format="%an" -1').trim()
          commitMsg = sh(returnStdout: true, script: 'git log --no-merges --format="%B" -1 ${commitSha}').trim()

          commitInfo = "<${env.GH_URL}/commit/${commitSha}|${commitSha}> - ${commitAuthor} - ${commitMsg}"
        }

        sh 'bash -l scripts/deploy.sh'
        sh 'scripts/test-e2e.sh'
      }

      post {
        success {
          slackSend (channel: "#notifications-example", color: '#00FF00', message: "SUCCESS: Deployed new code to staging after ${currentDurationString()}. (<${env.MP_URL}|Preview staging>)")
        }

        failure {
          slackSend (channel: "#notifications-example", color: '#FF0000', message: "FAILED: Build failed after ${currentDurationString()}. (<${env.BUILD_URL}|Open build details>)")
        }
      }
    }
  }
}

def currentDurationString() {
   return hudson.Util.getTimeSpanString(currentBuild.getDuration());
}
