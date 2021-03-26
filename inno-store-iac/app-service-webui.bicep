param location string
param name string
param appServicePlanID string
param apiUrl string
param apiWsUrl string

resource app 'Microsoft.Web/sites@2020-10-01' = {
  name: name
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlanID
    siteConfig: {
      alwaysOn: true
      scmType: 'None'
      appSettings: [
        {
          name: 'API_URL'
          value: apiUrl
        }
        {
          name: 'API_WS_URL'
          value: apiWsUrl
        }
        {
          name: 'WEBSITE_WEBDEPLOY_USE_SCM'
          value: 'true'
        }
      ]
    }
  }
}
