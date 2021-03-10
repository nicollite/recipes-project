import { Injectable, PipeTransform } from "@nestjs/common";
import { GetRecipesPageQuery } from "shared";

@Injectable()
export class ParseGetQueryPipe implements PipeTransform {
  transform(value: GetRecipesPageQuery) {
    return { lastId: value.lastId, pageSize: parseInt(value.pageSize as any) };
  }
}
