pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        APP_DIR = '/var/www/client/tapride-frontend'
        PORT = '8070'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/masadnazir1/tapride-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm ci'
                }
            }
        }

        stage('Build') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir("${APP_DIR}") {
                    // Kill existing screen session if running
                    sh '''
                    SCREEN_NAME=tapride
                    if screen -list | grep -q "$SCREEN_NAME"; then
                        screen -S $SCREEN_NAME -X quit
                    fi

                    # Start new detached screen running Next.js on port 8070
                    screen -dmS $SCREEN_NAME bash -c "PORT=$PORT npm run start"
                    '''
                }
            }
        }
    }

    post {
        success { echo 'Deployment successful.' }
        failure { echo 'Deployment failed.' }
    }
}

