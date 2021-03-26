param location string = 'switzerlandnorth'
param name string = 'inno-store-01'

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
    repoUrl: 'https://github.com/InnoVaders/inno-store.git'
  }
}

module appServiceApi './app-service-api.bicep' = {
  name: 'appServiceApi'
  params: {
    name: '${name}-app-api'
    location: location
    appServicePlanID: appServicePlanModule.outputs.appServicePlanID
    repoUrl: 'https://github.com/InnoVaders/inno-store.git'
  }
}


