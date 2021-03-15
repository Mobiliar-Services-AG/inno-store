param location string
param name string

resource appServicePlan 'Microsoft.Web/serverfarms@2018-02-01' = {
  name: name
  location: location
  kind: 'linux'
  sku: {
    name: 'B1'
    tier: 'Basic'
    size: 'B1'
    family: 'B'
    capacity: 1
  }
}
output appServicePlanID string = appServicePlan.id
