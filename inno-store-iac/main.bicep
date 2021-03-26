param location string = 'switzerlandnorth'
param name string = 'inno-store-02'

module appServicePlan './app-service-plan.bicep' = {
  name: 'appServicePlan'
  params: {
   name: '${name}-plan'
   location: location
  }
}

module appApi './app-service-api.bicep' = {
  name: 'appServiceApi'
  params: {
    name: '${name}-app-api'
    location: location
    appServicePlanID: appServicePlan.outputs.appServicePlanID
  }
}

module appWebUi './app-service-webui.bicep' = {
  name: 'appServiceWebui'
  params: {
    name: '${name}-app-webui'
    location: location
    appServicePlanID: appServicePlan.outputs.appServicePlanID
    apiUrl: appApi.outputs.apiUrl
    apiWsUrl: appApi.outputs.apiWsUrl
  }
}



