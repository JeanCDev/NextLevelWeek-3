import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import {Request, Response} from 'express';
import OrphanageView from '../views/OrphanagesView';
import * as Yup from 'yup';

export default {
  async index(req: Request, res: Response){
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations:['images']
    });

    return res.json(OrphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response){
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id,{
      relations:['images'],
    });

    return res.json(OrphanageView.render(orphanage));
  },

  async create(req: Request, res: Response){
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;
  
    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map(file =>{
      return {path: file.filename}
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    };
    
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome Obrigatório'),
      latitude: Yup.number().required('Latitude Obrigatório'),
      longitude: Yup.number().required('Longitude Obrigatório'),
      about: Yup.string().required('Sobre Obrigatório').max(300),
      instructions: Yup.string().required('Instruções Obrigatórias'),
      opening_hours: Yup.string().required('Hora de abertura Obrigatória'),
      open_on_weekends: Yup.boolean().required('Informa se o orfanato é aberto aso fins de semana'),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        }))
    });

    await schema.validate(data,{
      abortEarly:false,
    });

    const orphanage = orphanagesRepository.create(data);
  
    await orphanagesRepository.save(orphanage);
  
    return res.status(201).json(orphanage);
  }
}