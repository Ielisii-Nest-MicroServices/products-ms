import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginationDto } from 'src/common/dtos';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  //@Post()
  @MessagePattern(({ cmd: "createProduct" }))
  create(@Payload() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  //@Get()
  @MessagePattern({ cmd: "findAll" })
  findAll(
    @Payload() paginatioDto: PaginationDto) {
    return this.productosService.findAll(paginatioDto);
  }

  //  @Get(':id')
  @MessagePattern({ cmd: "findeOne" })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({ cmd: "updateProduct" })
  update(@Payload() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(updateProductoDto.id, updateProductoDto);
  }

  //@Delete(':id')
  @MessagePattern({ cmd: "deleteOne" })
  remove(@Payload('id') id: string) {
    return this.productosService.remove(+id);
  }
}
