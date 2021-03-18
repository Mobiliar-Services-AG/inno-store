param location string
param name string
param appServicePlanID string
param repoUrl string

resource app 'Microsoft.Web/sites@2020-06-01' = {
  name: name
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlanID
  }
}

resource appConfig 'Microsoft.Web/sites/config@2020-09-01' = {
  name: '${app.name}/config'
  properties: {
    scmType:  'GitHubAction'
  }
}

resource appSource 'Microsoft.Web/sites/sourcecontrols@2020-06-01' = {
  name: '${app.name}/source'
  properties: {
    isGitHubAction: true
    repoUrl: repoUrl
    branch: 'main'
    isManualIntegration: true
  }
}