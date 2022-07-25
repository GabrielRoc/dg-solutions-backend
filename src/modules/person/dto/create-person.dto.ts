import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class CreatePersonDto {
  @JoiSchema(['CREATE'], Joi.string().required())
  name: string;

  @JoiSchema(['CREATE'], Joi.date().required())
  birthDate: Date;
}
