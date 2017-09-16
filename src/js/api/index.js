import PetStore from './petstore'

function getApiInstance () {
  return new PetStore()
}

export default getApiInstance()
