param location string = 'switzerlandnorth'
param name string = 'innostore'

module db './db.bicep' = {
  name: 'db'
  params: {
    name: '${name}-db'
    location: location
  }
}

module eventGrid './eventgrid.bicep' = {
  name: 'eventGrid'
  params: {
    topicName: '${name}-topic'
    location: location
  }
}

module serviceBus './servicebus.bicep' = {
  name: 'serviceBus'
  params: {
    location: location
    serviceBusNamespaceName: '${name}-servicebusns'
    serviceBusQueueName: 'orders'
  }
}

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
    name: '${name}-api'
    location: location
    appServicePlanID: appServicePlan.outputs.appServicePlanID
    cosmosEndpoint: db.outputs.cosmosEndpoint
    cosmosKey: db.outputs.cosmosKey
  }
}

module appWebUi './app-service-webui.bicep' = {
  name: 'appServiceWebui'
  params: {
    name: '${name}-webui'
    location: location
    appServicePlanID: appServicePlan.outputs.appServicePlanID
    apiUrl: appApi.outputs.apiUrl
    apiWsUrl: appApi.outputs.apiWsUrl
  }
}

module appFunctions './app-service-functions.bicep' = {
  name: 'appServiceFunctions'
  params: {
    name: '${name}-functions'
    storageName: '${name}storage'
    location: location
    appServicePlanID: appServicePlan.outputs.appServicePlanID
    cosmosDbConnection: db.outputs.cosmosConnectionString
    serviceBusConnection: serviceBus.outputs.connectionString
  }
}



