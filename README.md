# node-cache
Simple node.js cache library

## Example

```javascript
import Cache from './index.mjs'

const run = async () => {
  const path = './cache.json.br'
  const cache = new Cache(path)
  // load
  await cache.load()
  // get
  const value = cache.get('key')
  // set
  cache.set('key', value)
  // save
  await cache.save()
}

run()
```
