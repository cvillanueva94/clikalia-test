
export class PaginationDto {
    limit: number;
    offset: number;
    filter?: Object;

    constructor(limit: number, offset: number, filter?: Object) {
        this.limit = limit;
        this.offset = offset;
        this.filter = filter;
    }
}