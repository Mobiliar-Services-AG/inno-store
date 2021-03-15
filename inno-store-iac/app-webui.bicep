param location string
param name string
param appServicePlanID string

resource stg 'Microsoft.Web/sites@2018-11-01' = {
  name: name
  location: location
  kind: 'app,linux'
  properties: {
      serverFarmId: appServicePlanID
 }
}
