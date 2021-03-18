param location string
param name string
param appServicePlanID string

resource app 'Microsoft.Web/sites@2018-11-01' = {
  name: name
  location: location
  kind: 'app,linux'
  properties: {
      serverFarmId: appServicePlanID
 }
}

resource appConfig 'Microsoft.Web/sites/config@2018-11-01' = {
  name: '${name}-config'
  location: location
}
