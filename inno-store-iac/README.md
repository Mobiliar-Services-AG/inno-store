# Deploy IaC

    az deployment group create -f .\inno-store-iac\main.bicep -g inno-store-rg

## Compile biceps

    bicep build .\inno-store-iac\main.bicep

## Configure Deployment Credentials

see https://about-azure.com/deploying-to-azure-using-github-actions/

    az login

    az ad sp create-for-rbac --name http://xxx -deploy --role 'contributor' --scopes '/subscriptions/[subid]/resourceGroups/inno-store/' --sdk-auth
    
    az ad sp create-for-rbac --name 'http://xxx' --role contributor --scopes /subscriptions/[subid]/resourceGroups/inno-store --sdk-auth


# Issues

- when deployment fails - no rollback is happening
- git config not working
