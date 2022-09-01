/** @format */

export class UserCache {
  private map = new Map()

  set(key: string, value: any, expire?: number) {
    let now = Date.now()
    this.map.set(key, { value, time: now, expire: expire && now + expire })
    return value
  }

  add(key) {
    this.set(key, 1)
  }

  get(key) {
    if (this.isExpire(key)) {
      return null
    }
    return this.map.get(key).value
  }

  delete(key) {
    this.map.delete(key)
  }

  clear() {
    this.map.clear()
  }

  isExpire(key) {
    let val = this.map.get(key)

    if (val) {
      if (val.expire && val.expire <= Date.now()) {
        this.delete(key)
        return true
      }
      return false
    }

    return true
  }

  isExist(key) {
    return this.map.has(key)
  }

  has = this.isExist
}
