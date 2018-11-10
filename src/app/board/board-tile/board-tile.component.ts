import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.css']
})
export class BoardTileComponent implements OnInit {

    @Input() row: number;
    @Input() col: number;

    content = '';
    isHighlight = false;

    constructor() { }

    ngOnInit() {
    }

    // API

    setContent(content: string): boolean {
        if (this.content !== '') {
            return false;
        }

        this.content = content;
        return true;
    }

    getContent(): string {
        return this.content;
    }

    setHighlight() {
        this.isHighlight = true;
    }

    reset() {
        this.content = '';
        this.isHighlight = false;
    }
}
