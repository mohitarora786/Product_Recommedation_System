import { setCssVar } from 'quasar'
import { boot } from 'quasar/wrappers'

export default boot(() => {
  setCssVar('primary', '#22223B')
  setCssVar('secondary', '#0077bf') // blue
  setCssVar('info', '#00000005') 
  setCssVar('accent', '#424342')
  //   setCssVar('primary', '#0C1B33')
  //   setCssVar('primary', '#035E7B')
  // setCssVar('secondary', '#5270a3')
  // setCssVar('secondary', '#3561ad')
  // setCssVar('secondary', '#1F363D') //
})