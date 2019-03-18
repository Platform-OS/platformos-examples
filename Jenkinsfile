@Library('pipeline-utils')_  // it's not a typo

def staging_url = "https://nearme-example.staging.oregon.platform-os.com"
def production_url = "https://examples.platform-os.com"

pipeline {
  agent any

  environment {
    MPKIT_TOKEN = credentials('POS_TOKEN')
    MPKIT_EMAIL = "darek+ci@near-me.com"
  }

  parameters {
    string(description: 'Instance URL. When empty then we deploy on staging and production', name: 'MP_URL', defaultValue: '')
  }

  options {
    disableConcurrentBuilds()
    timeout(time: 10, unit: 'MINUTES')
    buildDiscarder(logRotator(daysToKeepStr: '1', artifactDaysToKeepStr: '1'))
  }

  stages {
    stage('Deploy to URL') {
      when { expression { return !params.MP_URL.isEmpty() } }
      environment { MPKIT_URL = "${params.MP_URL}" }
      agent { docker { image 'platformos/marketplace-kit:2.0' } }
      steps {
        sh 'marketplace-kit deploy'
      }
    }

    stage('Test on URL') {
      when { expression { return !params.MP_URL.isEmpty() } }
      agent { docker { image "platformos/testcafe" } }
      environment { MP_URL = "${params.MP_URL}" }
      steps {
        sh 'npm run test-ci'
      }
    }

    stage('Deploy staging') {
      agent { docker { image 'platformos/marketplace-kit:2.0' } }

      environment {
        MPKIT_URL = "${staging_url}"
      }

      when {
        expression { return params.MP_URL.isEmpty() }
        anyOf { branch 'master' }
      }

      steps {
        sh 'marketplace-kit deploy'
      }
    }

    stage('Test Staging') {
      agent { docker { image "platformos/testcafe" } }

      environment {
        MP_URL = "${staging_url}"
      }

      when {
        expression { return params.MP_URL.isEmpty() }
        anyOf { branch 'master' }
      }

      steps {
        sh 'npm run test-ci'
      }
    }

    stage('Deploy production') {
      agent { docker { image 'platformos/marketplace-kit:2.0' } }

      environment {
        MPKIT_URL = "${production_url}"
      }

      when {
        expression { return params.MP_URL.isEmpty() }
        anyOf { branch 'master' }
      }

      steps {
        sh 'marketplace-kit deploy'
      }
    }
  }

  post {
    success {
      slackSend (channel: "#notifications-example", color: '#00FF00', message: "SUCCESS: <${env.BUILD_URL}|Build #${env.BUILD_NUMBER}> - ${buildDuration()}. ${commitInfo()}")
    }

    failure {
      slackSend (channel: "#notifications-example", color: '#FF0000', message: "FAILED: <${env.BUILD_URL}|Open build details> - ${buildDuration()}")
    }
  }
}

def commitInfo() {
  GH_URL = "https://github.com/mdyd-dev/marketplace-nearme-example"

  def commitSha = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
  // def commitAuthor = sh(returnStdout: true, script: 'git log --no-merges --format="%an" -1').trim()
  def commitMsg = sh(returnStdout: true, script: 'git log --no-merges --format="%B" -1 ${commitSha}').trim()

  return "<${GH_URL}/commit/${commitSha}|${commitSha} ${commitMsg}>"
}
