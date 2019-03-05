@Library('pipeline-utils')_  // it's not a typo

pipeline {
  agent none

  environment {
    MPKIT_TOKEN = credentials('POS_TOKEN')
    MPKIT_EMAIL = "darek+ci@near-me.com"
    MPKIT_URL    = "${env.MP_URL}"
  }

  parameters {
    string(defaultValue: "https://nearme-example.staging.oregon.platform-os.com", description: 'nearme-example marketplace URL', name: 'MP_URL')
  }

  options {
    disableConcurrentBuilds()
    timeout(time: 10, unit: 'MINUTES')
    buildDiscarder(logRotator(daysToKeepStr: '1', artifactDaysToKeepStr: '1'))
  }

  stages {
    stage('Deploy') {
      agent { docker { image 'platformos/marketplace-kit:2.0' } }

      when { anyOf { branch 'master' } }

      steps {
        sh 'marketplace-kit deploy'
      }
    }

    stage('Test') {
      agent { docker { image "platformos/testcafe" } }

      when { anyOf { branch 'master' } }

      steps {
        sh 'scripts/test-e2e.sh'
      }
    }
  }
  post {
    success {
      slackSend (channel: "#notifications-example", color: '#00FF00', message: "SUCCESS: Deployed new code to staging after ${buildDuration()}. <${env.BUILD_URL}|Build #${env.BUILD_NUMBER}> - (<${env.MP_URL}|Preview staging>)")
    }

    failure {
      slackSend (channel: "#notifications-example", color: '#FF0000', message: "FAILED: Build failed after ${buildDuration()}. (<${env.BUILD_URL}|Open build details>)")
    }
  }
}

def commitInfo() {
  GH_URL = "https://github.com/mdyd-dev/marketplace-nearme-example"

  def commitSha = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
  def commitAuthor = sh(returnStdout: true, script: 'git log --no-merges --format="%an" -1').trim()
  def commitMsg = sh(returnStdout: true, script: 'git log --no-merges --format="%B" -1 ${commitSha}').trim()

  return "<${GH_URL}/commit/${commitSha}|${commitSha}> - ${commitAuthor} - ${commitMsg}"
}
