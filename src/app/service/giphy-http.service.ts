import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Search } from "../model/search";
import { Giphy } from "../model/giphy";
import { firstValueFrom, map, take } from "rxjs";

@Injectable()
export class GiphyHttpService {

    constructor(private http: HttpClient) {}

    doGet(search: Search): Promise<Giphy[]> {
        let qs = new HttpParams()
            .set("api_key", "0zCfbDxqrMQXfjVAAI0YGCqHNDjAAmWy")
            .set("q", search.q)
            .set("limit", search.limit)
        
        return firstValueFrom<Giphy[]>(
            this.http.get<any>('https://api.giphy.com/v1/gifs/search', { params: qs})
                .pipe(
                    take(1),
                    map(v => {
                        const data: any[] = v.data
                        return data.map(g => {
                            return {
                                title: g.title,
                                url: g.url,
                                imageUrl: g.images.fixed_height.url
                            } as Giphy
                        })
                    })
                )
            )   
        }

}
