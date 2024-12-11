export const fileFilter =(req: Express.Request, file: Express.Multer.File, cb:Function )=>{
    // console.log(file);


    const fileExptension = file.mimetype.split('/')[1]
    console.log(fileExptension);
    const validExtensions = [
        'jpg',
        'png',
        'jpeg'
    ]

    if(validExtensions.includes(fileExptension)){
        console.log('la imagen si paso la validacion')

        return cb(null, true)
    }else{
        console.log('la imagen no paso la validacion')
        return cb(null,false)
    }


  
  
  
  }