# IaC 

## Setup

Deploy IaC

    az deployment group create -f .\inno-store-iac\main.bicep -g inno-store-rg

Create a Service Principal with 'Contributor' Role on the resource group.
 
    az ad sp create-for-rbac --name http://xxx -deploy --role 'contributor' --scopes '/subscriptions/[subid]/resourceGroups/[resource-group]/' --sdk-auth

Add the json output to a secret variable in your pipeline

    {
        "clientId": "<GUID>",
        "clientSecret": "<GUID>",
        "subscriptionId": "<GUID>",
        "tenantId": "<GUID>",
    }


## KnoffHoff

Compile Biceps

    bicep build .\inno-store-iac\main.bicep


Issues

- when deployment fails - no rollback is happening
- git config not working
- set up credentials
