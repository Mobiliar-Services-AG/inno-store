# IaC 

## Setup

Deploy IaC

    az deployment group create -f .\inno-store-iac\main.bicep -g inno-store-rg

Get the Publish profiles for the deployed Apps

    az webapp deployment list-publishing-credentials -g inno-store-rg --name inno-store-01-app-api
    az webapp deployment list-publishing-credentials -g inno-store-rg --name inno-store-01-app-webui



## KnoffHoff

Compile Biceps

    bicep build .\inno-store-iac\main.bicep

Configure Deployment Credentials  for IaC Pipleine

- see https://about-azure.com/deploying-to-azure-using-github-actions/


    az login

    az ad sp create-for-rbac --name http://xxx -deploy --role 'contributor' --scopes '/subscriptions/[subid]/resourceGroups/inno-store/' --sdk-auth
    
    az ad sp create-for-rbac --name 'http://xxx' --role contributor --scopes /subscriptions/[subid]/resourceGroups/inno-store --sdk-auth


Issues

- when deployment fails - no rollback is happening
- git config not working
