param location string
param name string
param appServicePlanID string
param repoUrl string

resource app 'Microsoft.Web/sites@2020-10-01' = {
  name: name
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlanID
    siteConfig: {
      alwaysOn: true
      scmType: 'ExternalGit'
    }
  }
}
