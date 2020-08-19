import { MongoClient, Db, Collection } from 'mongodb'
class Mongo {
  private client: MongoClient = null
  private db: Db = null

  public async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    this.db = this.client.db()
  }

  public getCollection (name: string): Collection {
    return this.db.collection(name)
  }

  public async disconnect (): Promise<void> {
    await this.client.close()
  }
}

export default new Mongo()
