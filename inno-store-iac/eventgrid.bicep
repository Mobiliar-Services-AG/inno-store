param location string
param topicName string

resource eventGrid 'Microsoft.EventGrid/topics@2020-10-15-preview' = {
  name: topicName
  location: location
  properties: {
    inputSchema: 'EventGridSchema'
    publicNetworkAccess: 'Enabled'
  }

}

output topicEndpointUri string = eventGrid.properties.endpoint
