param location string
param name string
param appServicePlanID string
param repoUrl string

resource app 'Microsoft.Web/sites@2020-10-01' = {
  name: name
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlanID
    siteConfig: {
      alwaysOn: true
      scmType: 'ExternalGit'
      appSettings: [
        {
          name: 'WEBSITE_WEBDEPLOY_USE_SCM'
          value: 'true'
        }
      ]
    }
  }
}

// resource appSource 'Microsoft.Web/sites/sourcecontrols@2020-10-01' = {
//   name: '${app.name}/source'
//   properties: {
//     isGitHubAction: false
//     repoUrl: repoUrl
//     branch: 'main'
//     isManualIntegration: true
//     deploymentRollbackEnabled: true
//     isMercurial: false
//   }
//   dependsOn: [
//     app
//   ]
//}
