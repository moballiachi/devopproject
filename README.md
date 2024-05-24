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
        
        aws iam create-role --role-name CodeDeployServiceRole --assume-role-policy-document file://devops/codedeploy-trust-policy.json --region sa-east-1
        aws iam attach-role-policy --role-name CodeDeployServiceRole --policy-arn arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole --region sa-east-1
            manual
        
            aws elbv2 create-load-balancer --name env-webapp-alb --subnets subnet-0214f8bffa6c35430 subnet-01b78701b5ffa0245 --security-groups sg-01ab2dbfd8900905e --region sa-east-1
            aws elbv2 create-target-group --name env-webapp-target-group --protocol HTTP --port 80 --vpc-id vpc-0ceb6c75766dc20ee --region sa-east-1
            aws elbv2 create-listener --load-balancer-arn arn:aws:elasticloadbalancing:sa-east-1:095423572062:loadbalancer/app/env-webapp-alb/e1fcafb420b3814f --protocol HTTP --port 80 --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:sa-east-1:095423572062:targetgroup/env-webapp-target-group/a4fc319efdd29843 --region sa-east-1
            
        aws deploy create-deployment-group --application-name env-webapp-codedeploy-app --deployment-group-name env-webapp-deployment-group --service-role-arn arn:aws:iam::095423572062:role/CodeDeployServiceRole --deployment-config-name CodeDeployDefault.ECSAllAtOnce --ecs-services clusterName=env-webapp-cluster,serviceName=env-webapp-service --region sa-east-1
        aws deploy create-deployment-group \
  --application-name env-webapp-codedeploy-app \
  --deployment-group-name env-webapp-deployment-group \
  --service-role-arn arn:aws:iam::095423572062:role/CodeDeployServiceRole \
  --deployment-config-name CodeDeployDefault.ECSAllAtOnce \
  --ecs-services clusterName=env-webapp-cluster,serviceName=env-webapp-service \
  --load-balancer-info "targetGroupInfoList=[{name=env-webapp-target-group}]" \
  --deployment-style "deploymentType=BLUE_GREEN,deploymentOption=WITH_TRAFFIC_CONTROL" \
  --region sa-east-1



    aws deploy create-deployment-group --application-name env-webapp-codedeploy-app --deployment-group-name env-webapp-deployment-group --service-role-arn arn:aws:iam::095423572062:role/CodeDeployServiceRole --deployment-config-name CodeDeployDefault.ECSAllAtOnce --ecs-services clusterName=env-webapp-cluster,serviceName=env-webapp-service --region sa-east-1
    aws deploy create-deployment --application-name env-webapp-codedeploy-app --deployment-group-name env-webapp-deployment-group --revision revisionType=AppSpecContent,s3Location={bucket=my-bucket,key=my-appspec.yaml,bundleType=yaml,eTag=eTagValue} --deployment-config-name CodeDeployDefault.ECSAllAtOnce --description "Deploying my ECS service" --region sa-east-1


