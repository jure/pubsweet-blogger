import config from 'config'
import { ReactSelector } from 'testcafe-react-selectors'

const helloWorld = {
  url: `${config.get('pubsweet-server.baseUrl')}/dashboard`,
  text: ReactSelector('HelloWorld'),
}

export default helloWorld
