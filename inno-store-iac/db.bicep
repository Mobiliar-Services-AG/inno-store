param location string
param name string

resource cosmos 'Microsoft.DocumentDB/databaseAccounts@2020-04-01' = {
  name: name
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

output cosmosEndpoint string = cosmos.properties.documentEndpoint
output cosmosKey string = listKeys(cosmos.id, cosmos.apiVersion).primaryMasterKey
