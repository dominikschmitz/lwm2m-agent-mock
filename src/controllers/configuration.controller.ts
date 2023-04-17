import express from 'express';
import deviceSchema from '../schemas/device.json' assert { type: 'json' };
import firmwareSchema from '../schemas/firmware.json' assert { type: 'json' };
import serverSchema from '../schemas/server.json' assert { type: 'json' };
import requestHandlingSchema from '../schemas/requestHandling.json' assert { type: 'json' };
import bootstrapServerSchema from '../schemas/boostrapServer.json' assert { type: 'json' };

export const configurationController = express.Router();

configurationController.get('/schemas', (req: express.Request, res: express.Response) => {
 return res.json(
    [
      deviceSchema,
      serverSchema,
      bootstrapServerSchema,
      firmwareSchema,
      requestHandlingSchema
    ]
  )
});