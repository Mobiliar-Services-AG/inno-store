param location string
param name string
param appServicePlanID string

resource app 'Microsoft.Web/sites@2020-10-01' = {
  name: name
  location: location
  kind: 'functionapp,linux'
  properties: {
    serverFarmId: appServicePlanID
    siteConfig: {
      scmType: 'None'
      linuxFxVersion: 'NODE|12-lts'
      appSettings: [
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~3'
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'node'
        }
      ]
    }
  }
}
