/*

  driver-portal-ui
  
  Build
  
  Publish if VERSION is set to any other than CI

  Uses Jenkins environment value GLOBAL_PRIVATE_DOCKER_REGISTRY for publishing
  
*/


pipeline {
    agent { 
        label 'docker'
    }
	options {
		timestamps()
		buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
		disableConcurrentBuilds()
	}
    parameters {
        string(name: 'VERSION', defaultValue: 'CI', description: 'Set version or leave empty for CI-image')
    }
    stages{
        stage ('Setup' ){
            steps {
                script {
                    env.dockerImage=''
                    env.containerName = 'driver-portal-ui'
				    if(params.VERSION==''){
					    env.version='CI';
						env.registry=env.GLOBAL_PRIVATE_DOCKER_REGISTRY;
					}
					else
					{
					    env.version=params.VERSION;
						env.registry=env.GLOBAL_PUBLIC_DOCKER_REGISTRY;
					}
					env.containerFullName = env.registry + '/ddswireless/' + env.containerName + ':' + env.version
                    currentBuild.displayName = env.containerName + ':' + env.version + ' #' + env.BUILD_NUMBER  
                    if (!env.BUILD_TIMESTAMP) {
                        // Jenkins Build timestamp plugin not installed
                        env.BUILD_TIMESTAMP = sh(script: "date -u +\"%Y-%m-%dT%H:%M:%SZ\"", returnStdout: true).trim()
                    }
                    label_options='--label build-date=' + env.BUILD_TIMESTAMP + ' --label version=' + env.version
                    // Inject build version info into container
                    version_args='--build-arg BUILD_NUMBER="${BUILD_NUMBER}"​ --build-arg BUILD_TIMESTAMP="${BUILD_TIMESTAMP}" --build-arg GIT_COMMIT="${GIT_COMMIT}"'
                }
            }
        }
        stage('Build'){
            steps{
                script{
                    dockerImage = docker.build(containerFullName, version_args + ' ' + label_options + ' -f docker_build .')
                }
            }
        }
        stage("Publish") {
            steps{
                script{	
					docker.withRegistry('http://'+env.registry, 'Docker_Public_Registry') {
						dockerImage.push()
					}
				    sh "docker rmi ${dockerImage.imageName()}"
                }
            }
        }
	}
}