import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(this.namespace)
    return accessToken ? JSON.parse(accessToken) : []
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(this.namespace, JSON.stringify(accessToken));
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.namespace);
  }
}

export default AuthStorage;