param location string = 'switzerlandnorth'

module appServicePlanModule './app-service-plan.bicep' = {
  name: 'appServicePlan'
  params: {
       name: 'inno-store-plan-2'
       location: location
  }
}

module appWebUi './app-webui.bicep' = {
  name: 'appWebUi'
  params: {
    name: 'inno-store-webui-2'
    location: location
    appServicePlanID: appServicePlanModule.outputs.appServicePlanID
  }
}

