import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as k8s from '@pulumi/kubernetes';

const config = new pulumi.Config();

/**
 * This is how we take the configurations from the stack.yaml
 * file of the specific environment
 */
const envName = config.require<string>("envName");


// Create an AWS S3 Bucket
const s3Bucket = new aws.s3.Bucket(`myBucket-${envName}`, {
    bucket: `my-pulumi-argo-bucket-${envName}`,
});

// Define app labels for Kubernetes Deployment
const appLabels = { app: `nginx-${envName}` };

const ns = new k8s.core.v1.Namespace(`env-${envName}`, {
    metadata: {
        name: `env-${envName}`
    }
});

// Kubernetes Deployment for NGINX
const deployment = new k8s.apps.v1.Deployment(`nginxDeployment-${envName}`, {
    metadata: {
        name: `nginx-deployment-${envName}`,
        namespace: ns.metadata.name
    },
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 2, // Number of replicas
        template: {
            metadata: {
                labels: appLabels,
            },
            spec: {
                containers: [{
                    name: "nginx",
                    image: "nginx:latest", // NGINX Docker image
                }],
            },
        },
    },
});

// Export the name of the bucket
export const bucketName = s3Bucket.bucket;
