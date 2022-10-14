import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ElasticsController {
    public async getElasticStatus({ }: HttpContextContract) {
        const elasticStatus = await axios.get(`http://localhost:9200`);
        return elasticStatus.data
    }

    public async createIndex({ request }: HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({
                indexName: schema.string(),
                type: schema.string()
            })
        })
        const indexName = req.indexName;
        const type = req.type
        const data = {
            "first_name": "Lisa",
            "candy": "Sour Skittles"
        }
        const indexCreate = await axios.post(`http://127.0.0.1:9200/${indexName}/${type}`, data);
        return indexCreate.data;
    }

    public async showIndexData({ request }: HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({
                indexName: schema.string(),
                type: schema.string(),
                id: schema.string()
            })
        })
        const indexName = req.indexName;
        const type = req.type;
        const id = req.id
        const indexDetails = await axios.get(`http://127.0.0.1:9200/${indexName}/${type}/${id}`)
        return indexDetails.data._source
    }

    public async updateIndexData({ request }: HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({
                indexName: schema.string(),
                type: schema.string(),
                id: schema.string()
            })
        })
        const data = {
            "doc": {
                "first_name": "Mona Lisa"
            }
        }
        const indexName = req.indexName;
        const id = req.id
        const updateIndexData = await axios.post(`http://127.0.0.1:9200/${indexName}/_update/${id}`, data)
        return updateIndexData.data.result
    }

    public async deleteIndex({ request }: HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({
                indexName: schema.string()
            })
        })
        const indexName = req.indexName;
        const deleteIndex = await axios.delete(`http://127.0.0.1:9200/${indexName}`)
        return deleteIndex.data
    }
}
