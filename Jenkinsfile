// def staging_url = "https://nearme-example.staging.oregon.platform-os.com"
// def production_url = "https://examples.platform-os.com"

pipeline {
  agent none

  options {
    buildDiscarder(logRotator(daysToKeepStr: '1', artifactDaysToKeepStr: '1'))
  }

  parameters {
    string(description: 'Instance URL', name: 'TARGET_URL', defaultValue: 'https://nearme-example.staging.oregon.platform-os.com')
  }

  environment {
    MPKIT_TOKEN = credentials('MPKIT_TOKEN')
    MPKIT_EMAIL = credentials('MPKIT_EMAIL')
    MPKIT_URL   = "${params.TARGET_URL}"
    CI = true
    CONFIRMATION_TEXT = "${params.TARGET_URL}"
    // Production instances persist data between runs, so destructive/data-mutating
    // tests must skip there. Listed explicitly; a trailing slash on TARGET_URL is
    // normalized away before matching. Propagated to the test suite; when unset
    // (e.g. local dev) tests treat the instance as non-protected and run.
    // NOTE: a new prod region must be added here or its tests will run against it.
    PROTECTED_INSTANCE = "${['https://examples.platform-os.com', 'https://examples.prod01.london.platform-os.com', 'https://examples-sydney.prod01.sydney.platformos.com'].contains(params.TARGET_URL.replaceAll('/+\$', '')) ? 'true' : 'false'}"
  }

  stages {
    stage('deploy') {
      options {
        timeout(time: 5, unit: 'MINUTES')
      }
      agent { kubernetes { yaml podTemplate("amd64") } }
      steps {
        container(name: 'playwright') {
          sh 'npm ci'
          // sh 'echo "CONFIRMATION_TEXT: $CONFIRMATION_TEXT"'
          // sh 'pos-cli data clean --include-schema --auto-confirm'
          sh 'pos-cli deploy'
          sh 'sleep 10'
        }
      }
    }

    stage('test') {
      options {
        timeout(time: 10, unit: 'MINUTES')
      }
      agent { kubernetes { yaml podTemplate("amd64") } }
      steps {
        container(name: 'playwright') {
          sh 'npm run test-ci'
        }
      }

      post {
        failure {
          container(name: 'playwright') {
            archiveArtifacts "test-results/"
          }
        }
        always {
          container(name: 'playwright') {
            publishHTML (target: [allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: "playwright-report"])
          }
        }
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
          - name: playwright
            resources:
              limits:
                cpu: 1
                memory: 2Gi
              requests:
                cpu: 1
                memory: 2Gi
            image: 'docker.io/platformos/playwright:6.0.7-1.60.0'
            imagePullPolicy: Always
            command:
            - cat
            tty: true
"""
}

