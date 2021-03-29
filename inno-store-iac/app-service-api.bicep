param location string
param name string
param appServicePlanID string
param cosmosEndpoint string 
param cosmosKey string 

resource app 'Microsoft.Web/sites@2020-10-01' = {
  name: name
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlanID
    siteConfig: {
      alwaysOn: true
      scmType: 'None'
      cors: {
        allowedOrigins: [
          '*'
        ]
      }
      webSocketsEnabled: true
      linuxFxVersion: 'NODE|12-lts'
      appSettings: [
        {
          name: 'COSMOSDB_ENDPOINT'
          value: cosmosEndpoint
        }
        {
          name: 'COSMOSDB_KEY'
          value: cosmosKey
        }
        {
          name: 'WEBSITE_WEBDEPLOY_USE_SCM'
          value: 'true'
        }
      ]
    }
  }
}

output apiUrl string = 'https://${app.properties.defaultHostName}/graphql'
output apiWsUrl string = 'wss://${app.properties.defaultHostName}/graphql'
