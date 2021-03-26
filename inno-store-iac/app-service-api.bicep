param location string
param name string
param appServicePlanID string

resource cosmos 'Microsoft.DocumentDB/databaseAccounts@2020-04-01' = {
  name: '${name}-db'
  location: location
  kind: 'GlobalDocumentDB'
  properties: {
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
    locations: [
      {
        locationName: location
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
    databaseAccountOfferType: 'Standard'
  }
}

resource app 'Microsoft.Web/sites@2020-10-01' = {
  name: name
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlanID
    siteConfig: {
      alwaysOn: true
      scmType: 'None'
      appSettings: [
        {
          name: 'COSMOSDB_ENDPOINT'
          value: cosmos.properties.documentEndpoint
        }
        {
          name: 'COSMOSDB_KEY'
          value: listKeys(cosmos.id, cosmos.apiVersion).primaryMasterKey
        }
        {
          name: 'WEBSITE_WEBDEPLOY_USE_SCM'
          value: 'true'
        }
      ]
    }
  }
}

output apiUrl string = 'https://${app.properties.defaultHostName}'
output apiWsUrl string = 'wss://${app.properties.defaultHostName}'
