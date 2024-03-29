import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((moments) => {
      console.log(moments);

      const data: Moment[] = moments.body;

      data.map((item) => {
        item.createdAt = new Date(item.createdAt!).toLocaleDateString('pt-BR');
      });

      this.allMoments = data;
      this.moments = data;
    });
  }

  search(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.moments = this.allMoments.filter((moment) =>
      moment.title
        .toLowerCase()
        .normalize('NFD')
        .includes(value)
    );
  }
}
