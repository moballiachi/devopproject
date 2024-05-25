# devopproject

## Indicaciones de Ejecución

### Paso 1: Asociar Política de AWS al Usuario

Asegúrate de asociar la siguiente política de AWS al usuario que ejecutará el pipeline:

```json
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
                "ecr:CompleteLayerUpload",
                "ecr:CreateRepository",
                "ecr:DescribeRepositories"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:PassRole",
                "codedeploy:CreateApplication",
                "codedeploy:CreateDeploymentGroup"
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
                "ecs:UpdateService",
                "ecs:DescribeClusters",
                "ecs:CreateCluster",
                "ecs:DescribeServices",
                "ecs:CreateService",
                "ecs:RunTask",
                "ec2:DescribeSubnets",
                "ec2:DescribeNetworkInterfaces"
            ],
            "Resource": "*"
        }
    ]
}
```

### Paso 2: Probar el Despliegue
Realiza un fork del repositorio en GitHub.
Abre el repositorio que deseas copiar.
Haz clic en el botón "Fork" para crear una copia del repositorio en tu cuenta de GitHub.

### Paso 3: Configurar Secretos en GitHub
Antes de ejecutar el pipeline, configura los siguientes secretos en el repositorio de GitHub:

> AWS_ACCESS_KEY_ID

> AWS_ACCOUNT_ID

> AWS_REGION

> AWS_SECRET_ACCESS_KEY

> AWS_SECURITY_GROUP

> AWS_VPC_ID

> AWS_VPC_SUBNET

Sigue estos pasos para configurar cada secreto:

Ingresa al repositorio en GitHub.
Ve a la pestaña "Settings" (Configuraciones).
Navega a "Secrets" (Secretos) y agrega cada secreto con su respectivo valor.

### Paso 4: Ejecutar el Pipeline

`$ git fetch --all`
`$ git checkout develop`
`$ git pull origin develop`
`$ git push origin develop`

### Paso 5: Probar la Dirección IP
Después de que el pipeline haya finalizado y obtengas la dirección IP pública del Task, prueba la dirección IP en tu navegador web:


Copiar código
http://TASK_PUBLIC_IP:8080
Sustituye TASK_PUBLIC_IP con la dirección IP obtenida.