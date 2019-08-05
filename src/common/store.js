import electron from 'electron'
import Store from 'electron-store'

const config = {
  type: 'go',
  path: '',
  flags: ['--migrate=true', '--routing=dhtclient', '--enable-gc=true'],
  keysize: 2048
}

const store = new Store()

if (store.get('version') !== 5) {
  store.clear()
  store.set('ipfsConfig', config)
  store.set('version', 5)
}

export default store
