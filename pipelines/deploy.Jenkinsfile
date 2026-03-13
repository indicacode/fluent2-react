// Jenkins version: 2.541.2
pipeline {
  agent any

  environment {
    // This repository is the exported web project itself (not a monorepo subfolder)
    WORKING_DIRECTORY = '.'
  }

  stages {
    stage('Deploy') {
      stages {
        stage('Clean Workspace') {
          steps {
            deleteDir()
            checkout scm
          }
        }


        stage('Install Dependencies') {
          when {
            anyOf {
              branch 'main'
              branch 'development'
            }
          }
          steps {
            dir("${env.WORKING_DIRECTORY}") {
              sh 'corepack enable && pnpm install --frozen-lockfile'
            }
          }
        }

        stage('Build') {
          when {
            anyOf {
              branch 'main'
              branch 'development'
            }
          }
          steps {
            dir("${env.WORKING_DIRECTORY}") {
              sh 'make build'
            }
          }
        }

        stage('Deploy to Production') {
          when {
            branch 'main'
            branch 'development'
          }
          steps {
            dir("${env.WORKING_DIRECTORY}") {
              sh 'swa deploy out --app-name stapp-fluent2-react --env production'
            }
          }
        }


      }
    }
  }
}
