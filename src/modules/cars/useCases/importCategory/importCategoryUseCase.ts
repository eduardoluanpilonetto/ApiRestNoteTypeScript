import fs from "fs";
import { parse } from "csv-parse";
import { ICategoryRepository } from "../../repositories/IcategoriesRespository";
import { inject, injectable } from "tsyringe";

interface IImportCategory{
    name: string;
    description: string
}

@injectable()
class ImportCategoryUseCase{

    constructor(@inject('CategoriesRepository') private categoriesRepository: ICategoryRepository){}

    load(file: any):Promise<IImportCategory[]>{
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);

            const parseFile = parse({delimiter: ';'});
    
            stream.pipe(parseFile);
    
            const categories: IImportCategory[]  = [];
    
            parseFile.on("data", async (line) => {
                const [name, description] = line
                categories.push({name, description})
            }).on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on("error", (err) => {
                reject(err);
            })
        })
    }

    async execute(file: any):Promise<void>{
      const categories = await this.load(file);
      
      categories.forEach(async (category) => {
      
        const { name, description } = category;
      
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

          if(!categoryAlreadyExists){
              this.categoriesRepository.create({name, description})
          }
      })
    }
}

export { ImportCategoryUseCase }