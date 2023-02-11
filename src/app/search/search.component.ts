import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Giphy } from '../model/giphy';
import { Search } from '../model/search';
import { GiphyHttpService } from '../service/giphy-http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search!: Search
  data!: Giphy
  form!: FormGroup

  dataArr: Giphy[] = []

  constructor(private fb: FormBuilder, private http: HttpClient, private giphyHttpSvc: GiphyHttpService) {}

  ngOnInit(): void {
      this.form = this.fb.group({
        q: this.fb.control(''),
        limit: this.fb.control('')
      })
  }

  processForm() {
    const formSearch: Search = this.form.value
    console.info('>>> searchCriteria: ', formSearch)
    this.giphyHttpSvc.doGet(formSearch)
      .then(result => {
        console.info('>>> in then, result: ', result)
        this.dataArr = result

      })
      .catch(error => {
        console.info('>>> in error')
        console.error('>>> error: ', error)
      })
      .finally(() => {
        console.info('>>> in finally')
        this.ngOnInit()
      })
    console.info('-------- after calling giphySvc.search()')
  }

}
