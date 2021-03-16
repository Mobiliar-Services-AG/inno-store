param location string = 'switzerlandnorth'
param name string = 'inno-store'

module appServicePlanModule './app-service-plan.bicep' = {
  name: 'appServicePlan'
  params: {
       name: '${name}-plan'
       location: location
  }
}

module appServiceWebui './app-service-webui.bicep' = {
  name: 'appServiceWebui'
  params: {
    name: '${name}-app-webui'
    location: location
    appServicePlanID: appServicePlanModule.outputs.appServicePlanID
  }
}

