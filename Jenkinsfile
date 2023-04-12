@Library('pipeline-utils')_  // it's not a typo

def staging_url = "https://nearme-example.staging.oregon.platform-os.com"
def production_url = "https://examples.platform-os.com"

pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timeout(time: 20, unit: 'MINUTES')
    buildDiscarder(logRotator(daysToKeepStr: '1', artifactDaysToKeepStr: '1'))
  }

  parameters {
    // string(description: 'Instance URL', name: 'MPKIT_URL', defaultValue: 'https://alpha.shx-01.frankfurt.platformos.com')
    // string(description: 'Instance URL', name: 'MPKIT_URL', defaultValue: 'https://template.qa0.oregon.platformos.com')
    choice(
      choices: [
        'https://ci-01.platformos.dev',
        'https://ci-02.platformos.dev',
        'https://ci-03.platformos.dev',
        'https://template.qa0.oregon.platformos.com',
        'https://getmarketplace-beta.staging.oregon.platform-os.com'
      ],
      name: 'MPKIT_URL')
  }

  environment {
    MPKIT_TOKEN = credentials('MPKIT_TOKEN')
    MPKIT_EMAIL = credentials('MPKIT_EMAIL')
    MPKIT_URL   = "${params.MPKIT_URL}"
    CI = true

    // TC REPORTS
    UPLOAD_HOST = "https://tests.qa0.oregon.platformos.com"
    REPORT_PATH  = "${env.GIT_COMMIT}-${System.currentTimeMillis()}"
    REPORT_TYPE = "manual"
  }

  stages {
    stage('build') {
      agent { kubernetes { yaml podTemplate("amd64") } }
      steps {
        container(name: 'testcafe') {
          sh 'npm ci'
          sh 'pos-cli deploy'
          sh 'sleep 10'
        }
      }
    }

    stage("tests") {
      agent { kubernetes { yaml podTemplate("amd64") } }
      steps {

        container(name: 'testcafe') {
          sh 'npm run test-ci'
        }
      }

      post {
        failure { archiveArtifacts "screenshots/" }
        // always {
        //   container(name: 'testcafe') {
        //     sh 'REPORT_TYPE=tc-concurrent npm run ci:test:publish'
        //     publishHTML (target: [allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: '', reportFiles: 'test-report.html', reportName: "tc-concurrent"])
        //   }
        // }
      }
    }

  }
}

def podTemplate(arch) {
  return """
        spec:
          nodeSelector:
            beta.kubernetes.io/arch: "${arch}"
          containers:
          - name: testcafe
            resources:
              limits:
                cpu: 3
                memory: 4Gi
              requests:
                cpu: 3
              memory: 4Gi
            image: 'platformos/testcafe:4.6.2-1.17.1'
            imagePullPolicy: Always
            command:
            - cat
            tty: true
"""
}

pipeline {
  agent any

  environment {
    MPKIT_TOKEN = credentials('POS_TOKEN')
    MPKIT_EMAIL = "darek+ci@near-me.com"
    CI = true
  }
