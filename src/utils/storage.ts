import { Storage } from '@plasmohq/storage'

const storage = new Storage()

export const setStorage = async (key: string, value: boolean) => {
  await storage.set(key, value)
}

export const getBooleanFromStorage = async (key: string) => {
  const storageData = await storage.get<boolean>(key)
  return storageData
}
