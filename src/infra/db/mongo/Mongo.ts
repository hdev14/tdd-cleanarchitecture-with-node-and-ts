import { MongoClient } from 'mongodb'
class Mongo {
  private client: MongoClient = null

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}

export default new Mongo()
