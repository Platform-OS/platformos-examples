// def staging_url = "https://nearme-example.staging.oregon.platform-os.com"
// def production_url = "https://examples.platform-os.com"

pipeline {
  agent any

  options {
    timeout(time: 20, unit: 'MINUTES')
    buildDiscarder(logRotator(daysToKeepStr: '1', artifactDaysToKeepStr: '1'))
  }

  parameters {
    string(description: 'Instance URL', name: 'TARGET_URL', defaultValue: 'https://nearme-example.qa0.oregon.platformos.com')
  }

  environment {
    MPKIT_TOKEN = credentials('MPKIT_TOKEN')
    MPKIT_EMAIL = credentials('MPKIT_EMAIL')
    MPKIT_URL   = "${params.TARGET_URL}"
    CI = true

    // TC REPORTS
    UPLOAD_HOST = "https://tests.qa0.oregon.platformos.com"
    REPORT_PATH  = "${env.GIT_COMMIT}-${System.currentTimeMillis()}"
    REPORT_TYPE = "manual"
  }

  stages {
    stage('build deploy test') {
      agent { kubernetes { yaml podTemplate("amd64") } }
      steps {
        container(name: 'testcafe') {
          sh 'npm ci'
          sh 'pos-cli deploy'
          sh 'sleep 10'
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
             
          imagePullSecrets:
          - name: dockeriosec
          - name: ocirsecret

          containers:
          - name: testcafe
            resources:
              limits:
                memory: 1Gi
              requests:
                cpu: 1
              memory: 1Gi
            image: 'platformos/testcafe:4.17.0-3.5.0'
            imagePullPolicy: Always
            command:
            - cat
            tty: true
"""
}

