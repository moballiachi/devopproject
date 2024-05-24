# devopproject

#Antes de ejecutar la aplicación, establece la variable de entorno ENVIRONMENT_NAME.

export ENVIRONMENT_NAME=Develop

#Instalar EJS:
npm install ejs

Pruebas locales:
Exponer puertos en security group del CLoud9

permission role policy in aws

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken",
                "ecr:BatchCheckLayerAvailability",
                "ecr:BatchGetImage",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ecs:DescribeClusters",
                "ecs:DescribeServices",
                "ecs:DescribeTaskDefinition",
                "ecs:DescribeTasks",
                "ecs:ListClusters",
                "ecs:ListServices",
                "ecs:ListTasks",
                "ecs:RegisterTaskDefinition",
                "ecs:UpdateService"
            ],
            "Resource": "*"
        }
    ]
}

register image repository env-webapp in ECR
    aws ecr create-repository --repository-name env-webapp --region sa-east-1
    
crear task definiton
    aws ecs register-task-definition --cli-input-json file://devops/task-definition.json  --region sa-east-1
    
crear codedeploy, group and description
    aws deploy create-application --application-name env-webapp-codedeploy-app --compute-platform ECS --region sa-east-1
    aws deploy create-deployment-group --application-name env-webapp-codedeploy-app --deployment-group-name env-webapp-deployment-group --service-role-arn arn:aws:iam::<account_id>:role/<codedeploy-service-role> --deployment-config-name CodeDeployDefault.ECSAllAtOnce --ecs-services clusterName=env-webapp-cluster,serviceName=env-webapp-service --region sa-east-1
    aws deploy create-deployment --application-name env-webapp-codedeploy-app --deployment-group-name env-webapp-deployment-group --revision revisionType=AppSpecContent,s3Location={bucket=my-bucket,key=my-appspec.yaml,bundleType=yaml,eTag=eTagValue} --deployment-config-name CodeDeployDefault.ECSAllAtOnce --description "Deploying my ECS service" --region sa-east-1


