module.exports = {
  dependencies: [
    'react-native-threads',
  ].reduce((dependencies, name) => {
    dependencies[name] = {
      platforms: {
        // disable Android platform,
        // other platforms will still autolink if provided
        android: null,
      },
    }
    return dependencies
  }, {}),
}
