import petstoreClient from './clients/petstore'

export default class PetStore {
  async findPetByStatus (status) {
    return petstoreClient.get('pet/findByStatus', { status })
  }
}
