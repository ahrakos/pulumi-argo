import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as k8s from '@pulumi/kubernetes';

// Create an AWS S3 Bucket
const s3Bucket = new aws.s3.Bucket("myBucket", {
    bucket: "my-pulumi-argo-bucket",
});

// Define app labels for Kubernetes Deployment
const appLabels = { app: "nginx" };

// Kubernetes Deployment for NGINX
const deployment = new k8s.apps.v1.Deployment("nginxDeployment", {
    metadata: {
        name: "nginx-deployment",
        namespace: 'default'
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
