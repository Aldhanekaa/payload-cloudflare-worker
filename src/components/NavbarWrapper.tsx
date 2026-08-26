import { getGlobalSettings } from '@/(payload)/globals/Global_Settings/getGlobalSettings'
import Navbar from './Navbar'

/**
 * Server-side wrapper for Navbar that fetches global settings
 * This component runs on the server and passes data to the client Navbar component
 */
export default async function NavbarWrapper() {
  const settings = await getGlobalSettings()

  return <Navbar settings={settings} />
}
