param location string
param name string
param storageName string
param appServicePlanID string
param serviceBusConnection string
param cosmosDbConnection string

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-01-01' = {
  name: storageName
  location: location
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    encryption: {
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

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
        {
          name: 'SERVICE_BUS_CONNECTION'
          value: serviceBusConnection
        }
        {
          name: 'COSMOSDB_CONNECTION'
          value: cosmosDbConnection
        }
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${listKeys(storageAccount.id, storageAccount.apiVersion).keys[0].value}'
        }
      ]
    }
  }
}
