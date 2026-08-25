import configPromise from '@payload-config'
import { getPayloadAuth } from 'payload-auth/better-auth'
import type { PayloadAuthConfig } from './auth/options'

export const getPayload = async () =>
  getPayloadAuth<PayloadAuthConfig>(configPromise)
