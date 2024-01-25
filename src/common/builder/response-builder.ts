export class ResponseDto {
  data: object;
  totalItemCount: number;
  totalPages: number;
  currentPage: number;
  message: string;
}

export class ResponseBuilder {
  private data: object | null;
  private totalItemCount: number | null;
  private totalPages: number | null;
  private currentPage: number | null;
  private message: string | null;

  setData(data: any) {
    this.data = data;
    return this;
  }

  setCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
    return this;
  }

  setItemCount(itemCount: number) {
    this.totalItemCount = itemCount;
    return this;
  }

  setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
    return this;
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  build() {
    const responseDto = new ResponseDto();
    responseDto.data = this.data;
    responseDto.message = this.message;

    this.totalPages != undefined
      ? (responseDto.totalPages = this.totalPages)
      : null;

    this.totalItemCount != undefined
      ? (responseDto.totalItemCount = this.totalItemCount)
      : null;

    this.currentPage != undefined
      ? (responseDto.currentPage = this.currentPage)
      : null;

    return responseDto;
  }
}