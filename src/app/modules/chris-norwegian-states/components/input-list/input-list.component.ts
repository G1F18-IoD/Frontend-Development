import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.css']
})
export class InputListComponent implements OnInit {

  constructor() { }

  /*public input = '1 Strøm Terrasse	Austad / Fjell\n' +
  '2 Strøm Terrasse	Austad / Fjell\n' +
  '3 Strøm Terrasse	Austad / Fjell\n' +
  '4 Strøm Terrasse	Austad / Fjell\n' +
  'Amtmand Bangs gate	Bragernes\n' +
  'Amtmand Bloms gate	Bragernes\n' +
  'Amtmand Breders gate	Bragernes\n' +
  'Anchersens vei	Austad / Fjell\n' +
  'Andorsrudveien	Konnerud\n' +
  'Andreas Nilsens vei	Austad / Fjell\n' +
  'Askeladden	Tangen / Åskollen\n' +
  'Auens vei	Tangen / Åskollen\n' +
  'Austadgata	Austad / Fjell\n' +
  'Austadveien	Austad / Fjell\n' +
  'Baker Thons alle	------------------\n' +
  'Bamse Brakars vei	Austad / Fjell\n' +
  'Barken	Tangen / Åskollen\n' +
  'Bergstien	Bragernes\n' +
  'Bernasbakken	Konnerud\n' +
  'Betzy Kjeldsbergs vei	Åssiden\n' +
  'Bj. Bjornsons gate	Strømsø / Danvik\n' +
  'Bjorkelia	Gulskogen\n' +
  'Blektjernveien	Austad / Fjell\n' +
  'Blentenborgveien	Konnerud\n' +
  'Bolstadhagen	Åssiden';*/
  public input = '';

  private addresses = [];
  private answers = [];

  ngOnInit() {
  }

  public splitInput() {
    this.addresses = [];
    this.answers = [];
    let splitForLines = this.input.split("\n");
    splitForLines.forEach((eachLine) => {
      let splittedLine = eachLine.split("\t");
      this.addresses.push({address: splittedLine[0], answer: splittedLine[1]});
      let found = false;
      this.answers.forEach((answer) => {
        if (answer == splittedLine[1]) {
          found = true;
        }
      });
      if (!found) {
        this.answers.push(splittedLine[1]);
      }
    });
    console.log(this.addresses);
    console.log(this.answers);
  }

  public getAddresses() {
    this.splitInput();
    return this.addresses;
  }

  public getPossibleAnswers() {
    this.splitInput();
    return this.answers;
  }

}
