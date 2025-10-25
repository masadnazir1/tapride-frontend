pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        DEPLOY_DIR = '/var/www/client/tapride-frontend'
        PORT = '8070'
        SCREEN_NAME = 'tapride'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/masadnazir1/tapride-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                sudo mkdir -p $DEPLOY_DIR
                sudo rsync -av --delete .next public package.json next.config.* $DEPLOY_DIR/

                cd $DEPLOY_DIR

                if screen -list | grep -q "$SCREEN_NAME"; then
                    screen -S $SCREEN_NAME -X quit
                fi

                sudo chown -R www-data:www-data $DEPLOY_DIR
                sudo chmod -R 755 $DEPLOY_DIR

                screen -dmS $SCREEN_NAME bash -c "PORT=$PORT npm run start"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful.'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
