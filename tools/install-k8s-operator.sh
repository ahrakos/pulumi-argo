TEMPLATE=deploy/deploy-operator-ts # for example
DIRNAME=deploy-operator
NAMESPACE=kube-system

mkdir $DIRNAME
cd $DIRNAME
pulumi new https://github.com/pulumi/pulumi-kubernetes-operator/$TEMPLATE
pulumi config set namespace $NAMESPACE
pulumi up --non-interactive --yes
cd ..
rm -rf $DIRNAME
