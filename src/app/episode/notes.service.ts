import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

@Injectable()
export class NotesService {
  constructor(private http: Http) {}

  getNotesByEpisodeId(id: number) {
    return this.http.get(`/assets/episode-notes/${id}.md`)
      .map((response: Response) => response.text());
  }
}
