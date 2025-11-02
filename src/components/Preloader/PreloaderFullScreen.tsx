import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const PreloaderFullScreen = () => {
  return (
    <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="white" style={{marginTop: 20}} />
          </View>
  )
}

export default PreloaderFullScreen