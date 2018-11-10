import {AfterViewInit, Component, EventEmitter, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {BoardTileComponent} from './board-tile/board-tile.component';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements AfterViewInit {

    playersSigns = ['X', 'O'];
    currentPlayer = 0;
    gameEnd = false;
    board: BoardTileComponent[][] = [[null, null, null], [null, null, null], [null, null, null]];

    @Output() playerTurn = new EventEmitter<number>();
    @Output() playerWon = new EventEmitter<number>();
    @Output() tie = new EventEmitter<void>();

    @ViewChildren(BoardTileComponent) boardTilesList: QueryList<BoardTileComponent>;

    constructor() { }

    ngAfterViewInit() {
        this.boardTilesList.forEach(tile => {
            this.board[tile.row][tile.col] = tile;
        });

        setTimeout(() => this.playerTurn.emit(this.currentPlayer + 1), 0);
    }

    onTileClicked(tile: BoardTileComponent = null) {
        if (this.gameEnd)
            return;

        const sign = this.playersSigns[this.currentPlayer];
        tile.setContent(sign);
        const wonTiles = this.getWonTiles(sign);
        if (wonTiles.length > 0) {
            wonTiles.forEach(wonTile => wonTile.setHighlight());
            this.gameEnd = true;
            this.playerWon.emit(this.currentPlayer + 1);
        }
        else if (this.isBoardFull()) {
            this.gameEnd = true;
            this.tie.emit();
        }
        else {
            this.currentPlayer = (this.currentPlayer + 1) % 2;
            this.playerTurn.emit(this.currentPlayer + 1);
        }
    }

    // checks if there's a win for the given sign and return an array of the winning tiles
    // if there's no win - return an empty array
    getWonTiles(sign: string): BoardTileComponent[] {
        let wonTiles: BoardTileComponent[];
        let won;
        // check for a win per row
        for (let row = 0; row < 3; row++) {
            // for each row check if there's a win (all tiles match the given sign)
            won = true;
            wonTiles = []; // a list of the won tile indexes to return
            for (let col = 0; col < 3; col++) {
                if (this.board[row][col].getContent() === sign) {
                    // the tile matches the sign - add to winTiles list
                    wonTiles.push(this.board[row][col]);
                }
                else {
                    // a tile that doesn't match the sign was found - no win in this row
                    won = false;
                    break;
                }
            }
            // if there's a win for this row - return the winning tile
            if (won) {
                return wonTiles;
            }
        }

        // check for a win per column
        for (let col = 0; col < 3; col++) {
            // for each row check if there's a win (all tiles match the given sign)
            won = true;
            wonTiles = []; // a list of the won tile indexes to return
            for (let row = 0; row < 3; row++) {
                if (this.board[row][col].getContent() === sign) {
                    // the tile matches the sign - add to winTiles list
                    wonTiles.push(this.board[row][col]);
                }
                else {
                    // a tile that doesn't match the sign was found - no win in this column
                    won = false;
                    break;
                }
            }
            // if there's a win for this column - return the winning tile
            if (won) {
                return wonTiles;
            }
        }

        // check for diagonal win
        won = true;
        wonTiles = []; // a list of the won tile indexes to return
        for (let i = 0; i < 3; i++) {
            if (this.board[i][i].getContent() === sign) {
                // the tile matches the sign - add to winTiles list
                wonTiles.push(this.board[i][i]);
            }
            else {
                // a tile that doesn't match the sign was found - no win in this diagonal
                won = false;
                break;
            }
        }
        // if there's a win for this diagonal - return the winning tile
        if (won) {
            return wonTiles;
        }

        // check for diagonal win
        won = true;
        wonTiles = []; // a list of the won tile indexes to return
        for (let i = 0; i < 3; i++) {
            if (this.board[i][2 - i].getContent() === sign) {
                // the tile matches the sign - add to winTiles list
                wonTiles.push(this.board[i][2 - i]);
            }
            else {
                // a tile that doesn't match the sign was found - no win in this diagonal
                won = false;
                break;
            }
        }
        // if there's a win for this diagonal - return the winning tile
        if (won) {
            return wonTiles;
        }

        return [];
    }

    isBoardFull() {
        return !this.boardTilesList.find(x => x.getContent() === '');
    }

    // API

    resetBoard() {
        this.currentPlayer = 0;
        this.gameEnd = false;
        this.boardTilesList.forEach(tile => tile.reset());
        this.playerTurn.emit(this.currentPlayer + 1);
    }
}
