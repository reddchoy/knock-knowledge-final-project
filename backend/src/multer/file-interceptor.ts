import { ForbiddenException } from '@nestjs/common';
import { diskStorage } from 'multer';

export const uploadFileInterceptor = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const name = file.originalname.split('.')[0];
      const fileExtension = file.originalname.split('.')[1];
      const newFileName = name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
      callback(null, newFileName);
    },
  }),
  // fileFilter: (req, file, callback) => {
  //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4)$/)) {
  //     return callback(null, false);
  //   }
  //   callback(null, true);
  // },
};
