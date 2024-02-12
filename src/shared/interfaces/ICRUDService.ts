import { ICRUDDto } from "./ICRUDDto";
import { PaginationDto } from "../dtos/pagination.dto";

export interface ICRUDService<
Dto extends ICRUDDto,
UpdateDto extends ICRUDDto
> {
	list(pagination: PaginationDto): Promise< Dto[]> | Dto[];
	create(dto: Dto): Promise<string> | string;
	update(dto: UpdateDto): Promise<Dto> | Dto;
	read(id: String): Promise<Dto> | Dto;
	delete(id: String): Promise<void> | void;
}
