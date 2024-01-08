helm repo add external-secrets https://charts.external-secrets.io
helm repo update
helm install external-secrets external-secrets/external-secrets -n kube-system --set serviceAccount.annotations."eks\.amazonaws\.com\/role-arn"="arn:aws:iam::746419327481:role/external-secrets"